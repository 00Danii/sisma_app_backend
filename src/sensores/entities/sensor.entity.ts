/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column('float')
  @IsNumber()
  temperaturaAmbiente: number;

  @Column('float')
  @IsNumber()
  humedadAmbiente: number;

  @Column('int')
  @IsNumber()
  humedadSuelo: number;

  @Column('boolean')
  @IsBoolean()
  lluviaSensor: boolean;

  @Column('float')
  @IsNumber()
  pH: number;

  @Column('float')
  @IsNumber()
  temperaturaLM35: number;

  @Column()
  @IsString()
  condicionClimatica: string;

  @Column('float')
  @IsNumber()
  temperaturaExterna: number;

  @Column('int')
  @IsNumber()
  humedadExterna: number;

  @CreateDateColumn()
  createdAt: Date;
}
