import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service.js';
import { CreateReservationDto } from './dto/create-reservation.dto.js';
import { UpdateReservationStatusDto } from './dto/update-reservation.dto.js';
import { ApiKeyGuard } from '../custom/guards/api.key.guard.js';
import { UserGuard } from '../custom/guards/user.guard.js';
import { RolesGuard } from '../custom/guards/roles.guard.js';
import { CurrentUser } from '../custom/decorators/usuario.actual.decorator.js';
import type { TestUser } from '../users/users.memory.js';
import { FilterReservationDto } from './dto/filter.reservation.dto.js';

@UseGuards(ApiKeyGuard, UserGuard, RolesGuard)
@Controller('reservas')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto, @CurrentUser() user: TestUser) {
    return this.reservationService.create(createReservationDto, user);
  }

  @Get()
  findAll(@CurrentUser() user: TestUser, @Query() filter: FilterReservationDto) {
    return this.reservationService.findAll(user, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: TestUser) {
    return this.reservationService.findOne(+id, user);
  } 

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationStatusDto, @CurrentUser() user: TestUser) {
    return this.reservationService.update(+id, updateReservationDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
