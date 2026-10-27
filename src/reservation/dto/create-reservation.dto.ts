import { IsDateString, IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, } from 'class-validator';
import { tipoHabitacionEnum } from '../enum/reservation.status.js';

export class CreateReservationDto {
    @IsString({ message: 'Debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El campo no debe estar vacio '})
    huesped: string;

    @IsNumberString({ no_symbols: true })
    @Length(6, 12, {message:'El número de dígitos debe ser entre 6 y 12'})
    @IsNotEmpty({ message: 'El campo no debe estar vacio '})
    documentoHuesped: string;

    @IsEnum(tipoHabitacionEnum)
    @IsNotEmpty({ message: 'El campo no debe estar vacio '})
    tipoHabitacion: tipoHabitacionEnum

    @IsDateString({})
    @IsNotEmpty({ message: 'El campo no debe estar vacio '})
    fechaIngreso: Date;

    @IsDateString({})
    @IsOptional({})
    fechaSalida: Date;

    @IsString({ message: 'Debe ser una cadena de texto' })
    @IsOptional({})
    recepcionista: string;

    @IsDateString({})
    @IsOptional({})
    actualizadaEn: Date | null;
}
