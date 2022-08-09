import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackofficeModule } from './backoffice/backoffice.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
       	uri: config.get<string>('CONNECTION_STRING'), // Loaded from .ENV
      }),
      inject: [ConfigService]
    }),
      BackofficeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
