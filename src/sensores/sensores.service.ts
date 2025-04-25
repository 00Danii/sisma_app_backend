/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from './entities/sensor.entity';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensoreDto } from './dto/update-sensore.dto';

@Injectable()
export class SensoresService {
  private readonly logger = new Logger('SensoresService');
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepository: Repository<Sensor>,
  ) {}

  async create(createSensorDto: CreateSensorDto) {
    try {
      const sensor = this.sensorRepository.create(createSensorDto);
      await this.sensorRepository.save(sensor);
      return sensor;
    } catch (error) {
      this.handleExeption(error);
    }
  }

  findAll() {
    return `This action returns all sensores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sensore`;
  }

  update(id: number, updateSensoreDto: UpdateSensoreDto) {
    return `This action updates a #${id} sensore`;
  }

  remove(id: number) {
    return `This action removes a #${id} sensore`;
  }

  private handleExeption(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Error del servidor');
  }
}
