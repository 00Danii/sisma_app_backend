import {
  Controller,
  Get,
  // Post,
  Body,
  Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { FertilizanteService } from './fertilizante.service';
// import { CreateFertilizanteDto } from './dto/create-fertilizante.dto';
// import { UpdateFertilizanteDto } from './dto/update-fertilizante.dto';

@Controller('fertilizante')
export class FertilizanteController {
  constructor(private readonly fertilizanteService: FertilizanteService) {}

  // @Post()
  // create(@Body() createFertilizanteDto: CreateFertilizanteDto) {
  //   return this.fertilizanteService.create(createFertilizanteDto);
  // }

  @Get('modo')
  getModoActual() {
    return this.fertilizanteService.getModoActual();
  }

  @Patch('modo')
  setModo(@Body() body: { modo: 'manual' | 'automatico'; activar?: boolean }) {
    return this.fertilizanteService.setModo(body);
  }

  // @Get()
  // findAll() {
  //   return this.fertilizanteService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.fertilizanteService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateFertilizanteDto: UpdateFertilizanteDto,
  // ) {
  //   return this.fertilizanteService.update(+id, updateFertilizanteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.fertilizanteService.remove(+id);
  // }
}
