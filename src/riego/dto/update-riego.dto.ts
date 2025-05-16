import { PartialType } from '@nestjs/mapped-types';
import { CreateRiegoDto } from './create-riego.dto';

export class UpdateRiegoDto extends PartialType(CreateRiegoDto) {}
