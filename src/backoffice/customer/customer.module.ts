import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { UserModule } from '../user/user.module';
import { UserSchema } from '../user/user.schema';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';
import { CreditCardController } from './credit-card/credit-card.controller';
import { CustomerController } from './customer.controller';
import { CustomerSchema } from './customer.schema';
import { CustomerService } from './customer.service';
import { PetController } from './pet/pet.controller';
import { PetService } from './pet/pet.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Customer',
                schema: CustomerSchema
            },
            {
                name: 'User',
                schema: UserSchema
            }
        ]),
        UserModule
    ],
    controllers: [
        AddressController,
        CreditCardController,
        CustomerController,
        PetController
    ],
    providers: [
        AddressService,
        CustomerService,
        PetService
    ]
})
export class CustomerModule { }
