import { IsEnum, IsOptional } from 'class-validator';
import { estadoEnum } from '../enum/reservation.status.js';

export class FilterReservationDto {
    @IsOptional()
    @IsEnum(estadoEnum, { message: 'El estado debe ser uno de los valores permitidos' })
    estado?: estadoEnum;
}   