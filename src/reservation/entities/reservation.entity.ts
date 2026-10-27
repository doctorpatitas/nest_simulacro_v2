import { Column, Entity, PrimaryGeneratedColumn, } from 'typeorm';
import { estadoEnum, tipoHabitacionEnum } from '../enum/reservation.status.js';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150 })
    huesped: string;

    @Column({ type: 'varchar', length: 120 })
    documentoHuesped: string;
    
    @Column({ type: 'enum', enum: tipoHabitacionEnum, default: tipoHabitacionEnum.DOBLE })
    tipoHabitacion: tipoHabitacionEnum;

    @Column({ type: 'timestamptz' })
    fechaIngreso: Date;

    @Column({ type: 'timestamptz'})
    fechaSalida: Date;

    @Column({})
    recepcionista: string;

    @Column({ type: 'enum', enum: estadoEnum, default: estadoEnum.PENDIENTE })
    estado: estadoEnum;

    @Column({ type: 'timestamptz' })
    creadaEn: Date;

    @Column({ type: 'timestamptz', nullable: true })
    actualizadaEn: Date | null;
}
