import { PartialType } from '@nestjs/mapped-types';
import { CreateFertilizanteDto } from './create-fertilizante.dto';

export class UpdateFertilizanteDto extends PartialType(CreateFertilizanteDto) {}
