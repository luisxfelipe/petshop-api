/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet } from './pet/pet.model';
import { Address } from './address/address.model';
import { Customer } from './cutomer.model';
import { QueryDto } from './dto/query.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreditCard } from './credit-card/credit-card.model';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel('Customer') private readonly model: Model<Customer>
    ) {}

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data)
        return await customer.save()
    }

    async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
        return await this.model
            .findOneAndUpdate({ document }, data)
    }

    async findAll(): Promise<Customer[]> {
        return await this.model
            .find({}, 'name email document')
            .sort('name')
            .exec()
    }

    async find(document: string): Promise<Customer> {
        return await this.model
            .findOne({ document })
            .populate('user', 'username').exec()
    }

    async query(model: QueryDto): Promise<Customer[]> {
        return await this.model
            .find(
                model.query,
                model.fields,
                {
                    skip: model.skip,
                    limit: model.take
                })
            .sort(model.sort)
            .exec()
    }

    async saveOrUpdateCreditCard(document: string, data: CreditCard): Promise<Customer> {
        const OPTIONS = { upsert: true }

        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                card: data
            }
        }, OPTIONS)
    }
}
