import {
  IsString,
  IsEnum,
  IsArray,
  IsUUID,
  IsOptional,
  // IsNumber,
  IsNumberString,
} from 'class-validator';

export class CreatePlantaDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  imagen?: string;

  @IsOptional()
  @IsString()
  nombreCientifico?: string;

  @IsEnum(['jardin', 'cultivo', 'hierba', 'frutal'])
  tipo: 'jardin' | 'cultivo' | 'hierba' | 'frutal';

  @IsEnum(['facil', 'intermedio', 'dificil'])
  dificultad: 'facil' | 'intermedio' | 'dificil';

  @IsString()
  caracteristicas: string;

  @IsOptional()
  @IsString()
  cuidados?: string;

  @IsOptional()
  @IsString()
  beneficios?: string;

  @IsOptional()
  @IsNumberString()
  riegoMinimo?: number;

  @IsOptional()
  @IsNumberString()
  riegoMaximo?: number;

  @IsOptional()
  @IsNumberString()
  humedadSuelo?: number;

  @IsEnum(['pleno-sol', 'sombra-parcial', 'sombra'])
  exposicionSolar: 'pleno-sol' | 'sombra-parcial' | 'sombra';

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  temporadaSiembra?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  plagasComunes?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  enfermedadesComunes?: string[];
}
