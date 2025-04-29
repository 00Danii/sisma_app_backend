/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
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

  async findAll() {
    try {
      return await this.sensorRepository.find();
    } catch (error) {
      this.handleExeption(error);
    }
  }

  async findOne(id: string) {
    const sensor = await this.sensorRepository.findOneBy({ id });
    if (!sensor) {
      throw new NotFoundException(`Sensor con id ${id} no encontrado`);
    }
    return sensor;
  }

  async findUltimoRegistro() {
    try {
      return await this.sensorRepository
        .createQueryBuilder('sensor')
        .orderBy('sensor.createdAt', 'DESC')
        .limit(1)
        .getOne();
    } catch (error) {
      this.handleExeption(error);
    }
  }

  async update(id: number, updateSensoreDto: UpdateSensoreDto) {
    const sensor = await this.sensorRepository.preload({
      id: id.toString(),
      ...updateSensoreDto,
    });

    if (!sensor) {
      throw new NotFoundException(`Sensor con id ${id} no encontrado`);
    }

    try {
      return await this.sensorRepository.save(sensor);
    } catch (error) {
      this.handleExeption(error);
    }
  }

  async remove(id: string) {
    const sensor = await this.findOne(id);
    try {
      await this.sensorRepository.remove(sensor);
      return { message: `Sensor con id ${id} eliminado correctamente` };
    } catch (error) {
      this.handleExeption(error);
    }
  }

  // Método para obtener el promedio de las temperaturas por día
  // Se utiliza la función DATE_TRUNC para agrupar por día
  // Se utiliza la función AVG para calcular el promedio de las temperaturas
  async findPromedioPorDia() {
    try {
      const result = await this.sensorRepository
        .createQueryBuilder('sensor')
        .select("DATE_TRUNC('day', sensor.createdAt)", 'fecha')
        .addSelect(
          'AVG(sensor.temperaturaAmbiente)',
          'promedioTemperaturaAmbiente',
        )
        .addSelect('AVG(sensor.temperaturaLM35)', 'promedioTemperaturaLM35')
        .addSelect(
          'AVG(sensor.temperaturaExterna)',
          'promedioTemperaturaExterna',
        )
        .groupBy('fecha')
        .orderBy('fecha', 'ASC')
        .getRawMany();

      return result.map((r) => ({
        fecha: r.fecha,
        temperaturaAmbiente: parseFloat(r.promedioTemperaturaAmbiente),
        temperaturaLM35: parseFloat(r.promedioTemperaturaLM35),
        temperaturaExterna: parseFloat(r.promedioTemperaturaExterna),
      }));
    } catch (error) {
      this.handleExeption(error);
    }
  }

  // Método para obtener el historico de las temperaturas por hora
  // Se utiliza la función DATE_TRUNC para agrupar por hora
  // Se utiliza la función AVG para calcular el promedio de las temperaturas
  async findHistorico24h() {
    try {
      const result = await this.sensorRepository
        .createQueryBuilder('sensor')
        .select("DATE_TRUNC('hour', sensor.createdAt)", 'fecha')
        .addSelect(
          'AVG(sensor.temperaturaAmbiente)',
          'promedioTemperaturaAmbiente',
        )
        .addSelect('AVG(sensor.temperaturaLM35)', 'promedioTemperaturaLM35')
        .addSelect(
          'AVG(sensor.temperaturaExterna)',
          'promedioTemperaturaExterna',
        )
        .where("sensor.createdAt >= NOW() - INTERVAL '24 HOURS'")
        .groupBy('fecha')
        .orderBy('fecha', 'ASC')
        .getRawMany();

      return result.map((r) => ({
        fecha: r.fecha,
        temperaturaAmbiente: parseFloat(r.promedioTemperaturaAmbiente),
        temperaturaLM35: parseFloat(r.promedioTemperaturaLM35),
        temperaturaExterna: parseFloat(r.promedioTemperaturaExterna),
      }));
    } catch (error) {
      this.handleExeption(error);
    }
  }

  async findHistorico7Dias() {
    try {
      const result = await this.sensorRepository
        .createQueryBuilder('sensor')
        .select("DATE_TRUNC('day', sensor.createdAt)", 'fecha')
        .addSelect(
          'AVG(sensor.temperaturaAmbiente)',
          'promedioTemperaturaAmbiente',
        )
        .addSelect('AVG(sensor.temperaturaLM35)', 'promedioTemperaturaLM35')
        .addSelect(
          'AVG(sensor.temperaturaExterna)',
          'promedioTemperaturaExterna',
        )
        .where("sensor.createdAt >= NOW() - INTERVAL '7 DAYS'")
        .groupBy('fecha')
        .orderBy('fecha', 'ASC')
        .getRawMany();

      return result.map((r) => ({
        fecha: r.fecha,
        temperaturaAmbiente: parseFloat(r.promedioTemperaturaAmbiente),
        temperaturaLM35: parseFloat(r.promedioTemperaturaLM35),
        temperaturaExterna: parseFloat(r.promedioTemperaturaExterna),
      }));
    } catch (error) {
      this.handleExeption(error);
    }
  }

  async findHistorico30Dias() {
    try {
      const result = await this.sensorRepository
        .createQueryBuilder('sensor')
        .select("DATE_TRUNC('day', sensor.createdAt)", 'fecha')
        .addSelect(
          'AVG(sensor.temperaturaAmbiente)',
          'promedioTemperaturaAmbiente',
        )
        .addSelect('AVG(sensor.temperaturaLM35)', 'promedioTemperaturaLM35')
        .addSelect(
          'AVG(sensor.temperaturaExterna)',
          'promedioTemperaturaExterna',
        )
        .where("sensor.createdAt >= NOW() - INTERVAL '30 DAYS'")
        .groupBy('fecha')
        .orderBy('fecha', 'ASC')
        .getRawMany();

      return result.map((r) => ({
        fecha: r.fecha,
        temperaturaAmbiente: parseFloat(r.promedioTemperaturaAmbiente),
        temperaturaLM35: parseFloat(r.promedioTemperaturaLM35),
        temperaturaExterna: parseFloat(r.promedioTemperaturaExterna),
      }));
    } catch (error) {
      this.handleExeption(error);
    }
  }

  // Método para obtener las estadísticas globales de temperatura: máximas y mínimas
  async findEstadisticasTemperatura() {
    try {
      const result = await this.sensorRepository
        .createQueryBuilder('sensor')
        .select('MAX(sensor.temperaturaAmbiente)', 'maxTemperaturaAmbiente')
        .addSelect('MIN(sensor.temperaturaAmbiente)', 'minTemperaturaAmbiente')
        .addSelect('MAX(sensor.temperaturaLM35)', 'maxTemperaturaLM35')
        .addSelect('MIN(sensor.temperaturaLM35)', 'minTemperaturaLM35')
        .addSelect('MAX(sensor.temperaturaExterna)', 'maxTemperaturaExterna')
        .addSelect('MIN(sensor.temperaturaExterna)', 'minTemperaturaExterna')
        .getRawOne();

      return {
        maxTemperaturaAmbiente: parseFloat(result.maxTemperaturaAmbiente),
        minTemperaturaAmbiente: parseFloat(result.minTemperaturaAmbiente),
        maxTemperaturaLM35: parseFloat(result.maxTemperaturaLM35),
        minTemperaturaLM35: parseFloat(result.minTemperaturaLM35),
        maxTemperaturaExterna: parseFloat(result.maxTemperaturaExterna),
        minTemperaturaExterna: parseFloat(result.minTemperaturaExterna),
      };
    } catch (error) {
      this.handleExeption(error);
    }
  }

  // Método para obtener el promedio de la humedad por día
  // Se utiliza la función DATE_TRUNC para agrupar por día
  // Se utiliza la función AVG para calcular el promedio de la humedad
  async findPromedioHumedadPorDia() {
    try {
      const result = await this.sensorRepository
        .createQueryBuilder('sensor')
        .select("DATE_TRUNC('day', sensor.createdAt)", 'fecha')
        .addSelect('AVG(sensor.humedadAmbiente)', 'promedioHumedadAmbiente')
        .addSelect('AVG(sensor.humedadSuelo)', 'promedioHumedadSuelo')
        .addSelect('AVG(sensor.humedadExterna)', 'promedioHumedadExterna')
        .groupBy('fecha')
        .orderBy('fecha', 'ASC')
        .getRawMany();

      return result.map((r) => ({
        fecha: r.fecha,
        humedadAmbiente: parseFloat(r.promedioHumedadAmbiente),
        humedadSuelo: parseFloat(r.promedioHumedadSuelo),
        humedadExterna: parseFloat(r.promedioHumedadExterna),
      }));
    } catch (error) {
      this.handleExeption(error);
    }
  }

  // Histórico de humedad de las últimas 24 horas
  async findHistoricoHumedad24h() {
    try {
      const result = await this.sensorRepository
        .createQueryBuilder('sensor')
        .select("DATE_TRUNC('hour', sensor.createdAt)", 'fecha')
        .addSelect('AVG(sensor.humedadAmbiente)', 'promedioHumedadAmbiente')
        .addSelect('AVG(sensor.humedadSuelo)', 'promedioHumedadSuelo')
        .addSelect('AVG(sensor.humedadExterna)', 'promedioHumedadExterna')
        .where("sensor.createdAt >= NOW() - INTERVAL '24 HOURS'")
        .groupBy('fecha')
        .orderBy('fecha', 'ASC')
        .getRawMany();

      return result.map((r) => ({
        fecha: r.fecha,
        humedadAmbiente: parseFloat(r.promedioHumedadAmbiente),
        humedadSuelo: parseFloat(r.promedioHumedadSuelo),
        humedadExterna: parseFloat(r.promedioHumedadExterna),
      }));
    } catch (error) {
      this.handleExeption(error);
    }
  }

  // Histórico de humedad de los últimos 7 días
  async findHistoricoHumedad7Dias() {
    try {
      const result = await this.sensorRepository
        .createQueryBuilder('sensor')
        .select("DATE_TRUNC('day', sensor.createdAt)", 'fecha')
        .addSelect('AVG(sensor.humedadAmbiente)', 'promedioHumedadAmbiente')
        .addSelect('AVG(sensor.humedadSuelo)', 'promedioHumedadSuelo')
        .addSelect('AVG(sensor.humedadExterna)', 'promedioHumedadExterna')
        .where("sensor.createdAt >= NOW() - INTERVAL '7 DAYS'")
        .groupBy('fecha')
        .orderBy('fecha', 'ASC')
        .getRawMany();

      return result.map((r) => ({
        fecha: r.fecha,
        humedadAmbiente: parseFloat(r.promedioHumedadAmbiente),
        humedadSuelo: parseFloat(r.promedioHumedadSuelo),
        humedadExterna: parseFloat(r.promedioHumedadExterna),
      }));
    } catch (error) {
      this.handleExeption(error);
    }
  }

  // Histórico de humedad de los últimos 30 días
  async findHistoricoHumedad30Dias() {
    try {
      const result = await this.sensorRepository
        .createQueryBuilder('sensor')
        .select("DATE_TRUNC('day', sensor.createdAt)", 'fecha')
        .addSelect('AVG(sensor.humedadAmbiente)', 'promedioHumedadAmbiente')
        .addSelect('AVG(sensor.humedadSuelo)', 'promedioHumedadSuelo')
        .addSelect('AVG(sensor.humedadExterna)', 'promedioHumedadExterna')
        .where("sensor.createdAt >= NOW() - INTERVAL '30 DAYS'")
        .groupBy('fecha')
        .orderBy('fecha', 'ASC')
        .getRawMany();

      return result.map((r) => ({
        fecha: r.fecha,
        humedadAmbiente: parseFloat(r.promedioHumedadAmbiente),
        humedadSuelo: parseFloat(r.promedioHumedadSuelo),
        humedadExterna: parseFloat(r.promedioHumedadExterna),
      }));
    } catch (error) {
      this.handleExeption(error);
    }
  }

  private handleExeption(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Error del servidor');
  }
}
