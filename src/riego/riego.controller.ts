import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RiegoService } from './riego.service';
import { CreateRiegoDto } from './dto/create-riego.dto';
import { UpdateRiegoDto } from './dto/update-riego.dto';

@Controller('riego')
export class RiegoController {
  constructor(private readonly riegoService: RiegoService) {}

  @Post()
  create(@Body() createRiegoDto: CreateRiegoDto) {
    return this.riegoService.create(createRiegoDto);
  }

  @Get()
  findAll() {
    return this.riegoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riegoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiegoDto: UpdateRiegoDto) {
    return this.riegoService.update(id, updateRiegoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riegoService.remove(id);
  }
}
