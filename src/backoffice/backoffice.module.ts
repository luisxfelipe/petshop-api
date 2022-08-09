import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CustomerModule,
    UserModule
  ]
})
export class BackofficeModule {}
