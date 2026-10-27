import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto.js';
import { UpdateReservationStatusDto } from './dto/update-reservation.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity.js';
import { TEST_USERS, TestUser } from '../users/users.memory.js';
import { FilterReservationDto } from './dto/filter.reservation.dto.js';
import { estadoEnum } from './enum/reservation.status.js';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}
  async create(createReservationDto: CreateReservationDto, user:TestUser): Promise<Reservation> {
    const fechaIngreso = new Date(createReservationDto.fechaIngreso);
    const fechaSalida = new Date(createReservationDto.fechaSalida);

    if (fechaIngreso < new Date()) {
      throw new BadRequestException('La fecha de ingreso no puede estar en el pasado')
    }

    if (fechaSalida <= fechaIngreso) {
      throw new BadRequestException('La fecha de salida debe ser posterior a la fecha de ingreso')
    }

    let recepcionistaId: string;

    if (user.role === 'recepcionista') {
      recepcionistaId = user.id;
    } else {
      if (!createReservationDto.recepcionista) {
        throw new BadRequestException('Debes indicar el recepcionista responsable')
      }
    }

    const existe = TEST_USERS.find(
      (u) => u.id === createReservationDto.recepcionista && u.role === 'recepcionista'
    );

    if (!existe) {
      throw new BadRequestException('El recepcionista indicado no existe o no tiene ese rol')
    }

    recepcionistaId = createReservationDto.recepcionista

    const nuevaReserva = this.reservationRepository.create({
      ...createReservationDto,
      recepcionista: recepcionistaId,
      estado: estadoEnum.PENDIENTE,
      creadaEn: new Date(),
    })

    return this.reservationRepository.save(nuevaReserva);
  }

  async findAll(user: TestUser, filter: FilterReservationDto): Promise<Reservation[]> {
    const where: any = {}

    if (filter.estado){
      where.estado = filter.estado
    }

    if (user.role === 'recepcionista') {
      where.recepcionista = user.id
    }

    const reserva = await this.reservationRepository.find({ where })
    return reserva;
  }

  async findOne(id: number, user: TestUser): Promise<Reservation> {
    const where: any = { id };
    
    if (user.role === 'recepcionista'){
      where.recepcionista = user.id;
    }

    const reserva = await this.reservationRepository.findOne({ where });

    if (!reserva) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`)
    }
    return reserva;
  }

  async update(id: number, updateReservationStatusDto: UpdateReservationStatusDto, user: TestUser): Promise<Reservation> {
    const reserva = await this.reservationRepository.findOneBy({ id });

    if (!reserva) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }

    if (user.role === 'recepcionista' && reserva.recepcionista !== user.id) {
      throw new ForbiddenException('No puedes modificar una reserva que no te pertenece');
    }

    const transicionesPermitidas: Record<string, string[]> = {
      PENDIENTE: ['CONFIRMADA', 'CANCELADA'],
      CONFIRMADA: ['EN_CURSO', 'CANCELADA'],
      EN_CURSO: ['FINALIZADA'],
      FINALIZADA: [],
      CANCELADA: [],
    }

    const destinosValidos = transicionesPermitidas[reserva.estado] ?? [];

    if(!destinosValidos.includes(updateReservationStatusDto.estado)) {
      throw new ConflictException(
        `No se puede pasar de ${reserva.estado} a ${updateReservationStatusDto.estado}`
      );
    }

    if (updateReservationStatusDto.estado === 'CANCELADA' && user.role === 'recepcionista') {
      throw new ForbiddenException('No tienes permiso para cancelar reservas');
    }

    reserva.estado = updateReservationStatusDto.estado;
    reserva.actualizadaEn = new Date();

    return this.reservationRepository.save(reserva);
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
