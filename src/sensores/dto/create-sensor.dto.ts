/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateSensorDto {
  @Type(() => Number)
  @IsNumber()
  temperaturaAmbiente: number;

  @Type(() => Number)
  @IsNumber()
  humedadAmbiente: number;

  @Type(() => Number)
  @IsNumber()
  humedadSuelo: number;

  @IsBoolean()
  lluviaSensor: boolean;

  @Type(() => Number)
  @IsNumber()
  pH: number;

  @Type(() => Number)
  @IsNumber()
  temperaturaLM35: number;

  @IsString()
  condicionClimatica: string;

  @Type(() => Number)
  @IsNumber()
  temperaturaExterna: number;

  @Type(() => Number)
  @IsNumber()
  humedadExterna: number;

  @IsBoolean()
  riegoActivo: boolean;
}
