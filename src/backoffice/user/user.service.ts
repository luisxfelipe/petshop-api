/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly model: Model<User>
    ) {
        
    }

    async create(data: User): Promise<User> {
        const user = new this.model(data)
        return await user.save()
    }
 }
