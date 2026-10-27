import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfig } from './config/env.config.js';
import { envValidationSchema } from './config/env.validation.schema.js';
import { ReservationModule } from './reservation/reservation.module.js';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [EnvConfig],
    validationSchema: envValidationSchema,
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      ...configService.getOrThrow('database'),
      autoLoadEntities: true,
      synchronize: true,
    }),
  }),
  ReservationModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
