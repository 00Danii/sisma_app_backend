import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Riego {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({ type: 'timestamptz' })
  @IsDate()
  horaInicio: Date;

  @Column({ type: 'timestamptz' })
  @IsDate()
  horaFin: Date;

  @Column({ type: 'float' })
  @IsNumber()
  duracion: number; // en segundos

  @Column({ type: 'float' })
  @IsNumber()
  humedadSueloInicio: number;

  @Column({ type: 'float' })
  @IsNumber()
  humedadSueloFin: number;

  @Column({ type: 'varchar' })
  @IsString()
  modo: 'automatico' | 'manual';

  @CreateDateColumn()
  createdAt: Date;
}
