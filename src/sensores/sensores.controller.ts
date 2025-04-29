import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SensoresService } from './sensores.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensoreDto } from './dto/update-sensore.dto';

@Controller('sensores')
export class SensoresController {
  constructor(private readonly sensoresService: SensoresService) {}

  @Post()
  create(@Body() createSensorDto: CreateSensorDto) {
    return this.sensoresService.create(createSensorDto);
  }

  @Get()
  findAll() {
    return this.sensoresService.findAll();
  }

  @Get('ultimo-registro')
  findUltimoRegistro() {
    return this.sensoresService.findUltimoRegistro();
  }

  // Endpoint para obtener el promedio de los sensores de temperatura por día
  @Get('promedios-temperatura-dia')
  findPromedioPorDia() {
    return this.sensoresService.findPromedioPorDia();
  }

  // Endpoint para obtener el promedio de los sensores de temperatura por hora
  @Get('historico-temperatura-24horas')
  findPromedioTemperaturaPorHora() {
    return this.sensoresService.findHistorico24h();
  }

  // Endpoint para obtener el promedio de los sensores de temperatura por 7 dias
  @Get('historico-temperatura-semana')
  findPromedioTemperaturaPorSemana() {
    return this.sensoresService.findHistorico7Dias();
  }

  // Endpoint para obtener el promedio de los sensores de temperatura por 30 dias
  @Get('historico-temperatura-mes')
  findPromedioTemperaturaPorMes() {
    return this.sensoresService.findHistorico30Dias();
  }

  // Obtener estadisticas de temperatura
  @Get('estadisticas-temperatura')
  findEstadisticasTemperatura() {
    return this.sensoresService.findEstadisticasTemperatura();
  }

  // Endpoint para obtener el promedio de los sensores de humedad por día
  @Get('promedios-humedad-dia')
  findPromedioHumedadPorDia() {
    return this.sensoresService.findPromedioHumedadPorDia();
  }

  // Endpoint para obtener el promedio de los sensores de humedad por hora
  @Get('historico-humedad-24horas')
  findPromedioHumedadPorHora() {
    return this.sensoresService.findHistoricoHumedad24h();
  }

  // Endpoint para obtener el promedio de los sensores de humedad por 7 dias
  @Get('historico-humedad-semana')
  findPromedioHumedadPorSemana() {
    return this.sensoresService.findHistoricoHumedad7Dias();
  }

  // Endpoint para obtener el promedio de los sensores de humedad por 30 dias
  @Get('historico-humedad-mes')
  findPromedioHumedadPorMes() {
    return this.sensoresService.findHistoricoHumedad30Dias();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensoresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSensoreDto: UpdateSensoreDto) {
    return this.sensoresService.update(+id, updateSensoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensoresService.remove(id);
  }
}
