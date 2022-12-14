/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../cutomer.model';
import { AddressType } from './address-type.enum';
import { Address } from './address.model';

@Injectable()
export class AddressService {
    constructor(
        @InjectModel('Customer') private readonly model: Model<Customer>
    ) {

    }

    async create(document: string, data: Address, type: AddressType): Promise<Customer> {
        const options = { upsert: true }

        if (type == AddressType.Billing) {
            return await this.model.findOneAndUpdate({ document }, {
                $set: {
                    billingAddress: data,
                },
            }, options);
        } else {
            return await this.model.findOneAndUpdate({ document }, {
                $set: {
                    shippingAddress: data,
                },
            }, options);
        }
    }
}
