import { Module } from '@nestjs/common';
import { Reservation } from './entities/reservation.entity.js';
import { ReservationService } from './reservation.service.js';
import { ReservationController } from './reservation.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
