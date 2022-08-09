import { UserService } from './user.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'User',
                schema: UserSchema
            }
        ])
    ],
    controllers: [],
    providers: [
        UserService,
    ],
    exports: [UserService]
})
export class UserModule { }
