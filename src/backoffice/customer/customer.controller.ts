/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Result } from '../result.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { CreditCard } from './credit-card/credit-card.model';
import { CreateCreditCartdDto } from './credit-card/dto/create-credit-card.dto';
import { CustomerService } from './customer.service';
import { Customer } from './cutomer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { QueryDto } from './dto/query.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly userService: UserService,
        private readonly customerService: CustomerService,
        @InjectConnection() private readonly connection: mongoose.Connection
    ) {}

    @Post()
    async post(@Body() createCustomerDto: CreateCustomerDto) {

        const session = await this.connection.startSession()
        session.startTransaction()

        try {
            const user = await this.userService.create(
                new User(createCustomerDto.document, createCustomerDto.password, true)
            )

            const customer = new Customer(
                createCustomerDto.name,
                createCustomerDto.document,
                createCustomerDto.email,
                null,
                null,
                null,
                null,
                user
            )
            const res = await this.customerService.create(customer)

            session.commitTransaction()

            return new Result('Cliente criado com sucesso!', true, res, null)

        } catch (error) {
            await session.abortTransaction()

            throw new HttpException(
                new Result(
                    'Não foi possível realizar seu cadastro',
                    false,
                    null,
                    error
                ),
                HttpStatus.BAD_REQUEST
            );
        } finally {
            session.endSession()
        }
    }

    @Put(':document')
    async update(@Param('document') document, @Body() updateCustomerDto: UpdateCustomerDto) {
        try {
            await this.customerService.update(document, updateCustomerDto)
            return new Result('Cliente atualizar com sucesso!', true, updateCustomerDto, null)
        } catch (error) {
            throw new HttpException(
                new Result(
                    'Não foi possível atualizar seus dados!',
                    false,
                    null,
                    error
                ),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Get()
    async getAll() {
        const CUSTOMERS = await this.customerService.findAll()

        return new Result(null, true, CUSTOMERS, null)
    }

    @Get(':document')
    async get(@Param('document') document) {
        const CUSTOMER = await this.customerService.find(document)

        return new Result(null, true, CUSTOMER, null)
    }

    @Post('query')
    async query(@Body() model: QueryDto) {
        const CUSTOMERS = await this.customerService.query(model)

        return new Result(null, true, CUSTOMERS, null)
    }

    @Post(':document/credit-card')
    async createCreditCard(@Param('document') document, @Body() createCreditCartdDto: CreateCreditCartdDto) {

        const modelAddress = new CreditCard(
            createCreditCartdDto.holder,
            createCreditCartdDto.number,
            createCreditCartdDto.expiration
        )

        try {
            await this.customerService.saveOrUpdateCreditCard(document, modelAddress)

            return new Result('Cartão adicionado com sucesso!', true, modelAddress, null)

        } catch (error) {
            throw new HttpException(
                new Result(
                    'Não foi possível adicionar o seu cartão',
                    false,
                    null,
                    error
                ),
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
