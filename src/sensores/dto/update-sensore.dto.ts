import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorDto } from './create-sensor.dto';

export class UpdateSensoreDto extends PartialType(CreateSensorDto) {}
