import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Planta } from './entities/planta.entity';
import { Repository } from 'typeorm';
import { CreatePlantaDto } from './dto/create-planta.dto';
import { UpdatePlantaDto } from './dto/update-planta.dto';

@Injectable()
export class PlantasService {
  constructor(
    @InjectRepository(Planta)
    private readonly plantaRepo: Repository<Planta>,
  ) {}

  async create(dto: CreatePlantaDto, imagenPath?: string): Promise<Planta> {
    const nueva = this.plantaRepo.create({ ...dto, imagen: imagenPath });
    return this.plantaRepo.save(nueva);
  }

  findAll(): Promise<Planta[]> {
    return this.plantaRepo.find();
  }

  async findOne(id: string): Promise<Planta> {
    const planta = await this.plantaRepo.findOneBy({ id });
    if (!planta) {
      throw new Error(`Planta with id ${id} not found`);
    }
    return planta;
  }

  async update(id: string, dto: UpdatePlantaDto): Promise<Planta> {
    await this.plantaRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.plantaRepo.delete(id);
  }
}
