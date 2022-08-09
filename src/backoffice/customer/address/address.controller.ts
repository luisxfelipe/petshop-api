/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Result } from 'src/backoffice/result.model';
import { AddressType } from './address-type.enum';
import { Address } from './address.model';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('v1/address')
export class AddressController {
    constructor(private readonly addAddressService: AddressService) {}

    @Post(':document/billing')
    async addBillingAddress(@Param('document') document, @Body() createAddressDto: CreateAddressDto) {

        const modelAddress = new Address(
            createAddressDto.zipCode,
            createAddressDto.street,
            createAddressDto.number,
            createAddressDto.complement,
            createAddressDto.neighborhood,
            createAddressDto.city,
            createAddressDto.state,
            createAddressDto.country
        )

        try {
            await this.addAddressService.create(document, modelAddress, AddressType.Billing)

            return new Result('Endereço criado com sucesso!', true, modelAddress, null)

        } catch (error) {
            throw new HttpException(
                new Result(
                    'Não foi possível adicionar o seu endereço',
                    false,
                    null,
                    error
                ),
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @Post(':document/shipping')
    async addShippingAddress(@Param('document') document, @Body() createAddressDto: CreateAddressDto) {

        const modelAddress = new Address(
            createAddressDto.zipCode,
            createAddressDto.street,
            createAddressDto.number,
            createAddressDto.complement,
            createAddressDto.neighborhood,
            createAddressDto.city,
            createAddressDto.state,
            createAddressDto.country
        )

        try {
            await this.addAddressService.create(document, modelAddress, AddressType.Shipping)

            return new Result('Endereço criado com sucesso!', true, modelAddress, null)

        } catch (error) {
            throw new HttpException(
                new Result(
                    'Não foi possível adicionar o seu endereço',
                    false,
                    null,
                    error
                ),
                HttpStatus.BAD_REQUEST
            );
        }
    }
 }
