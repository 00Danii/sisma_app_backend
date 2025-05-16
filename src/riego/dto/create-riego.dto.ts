import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateRiegoDto {
  @IsDateString()
  horaInicio: string;

  @IsDateString()
  horaFin: string;

  @IsNumber()
  humedadSueloInicio: number;

  @IsNumber()
  humedadSueloFin: number;

  @IsString()
  modo: 'automatico' | 'manual';
}
