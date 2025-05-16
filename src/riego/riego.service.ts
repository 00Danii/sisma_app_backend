import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Riego } from './entities/riego.entity';
import { CreateRiegoDto } from './dto/create-riego.dto';
import { UpdateRiegoDto } from './dto/update-riego.dto';

@Injectable()
export class RiegoService {
  constructor(
    @InjectRepository(Riego)
    private readonly riegoRepository: Repository<Riego>,
  ) {}

  async create(createRiegoDto: CreateRiegoDto): Promise<Riego> {
    const { horaInicio, horaFin, humedadSueloInicio, humedadSueloFin, modo } =
      createRiegoDto;

    const inicio = new Date(horaInicio);
    const fin = new Date(horaFin);

    const duracion = (fin.getTime() - inicio.getTime()) / 1000; // en segundos

    const riego = this.riegoRepository.create({
      horaInicio: new Date(horaInicio),
      horaFin: new Date(horaFin),
      duracion,
      humedadSueloInicio,
      humedadSueloFin,
      modo,
    });

    return await this.riegoRepository.save(riego);
  }

  async findAll(): Promise<Riego[]> {
    return await this.riegoRepository.find({
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Riego> {
    const riego = await this.riegoRepository.findOne({ where: { id } });
    if (!riego) throw new NotFoundException(`Riego con id ${id} no encontrado`);
    return riego;
  }

  async update(id: string, updateRiegoDto: UpdateRiegoDto): Promise<Riego> {
    const riego = await this.findOne(id);
    Object.assign(riego, updateRiegoDto);
    return await this.riegoRepository.save(riego);
  }

  async remove(id: string): Promise<void> {
    const result = await this.riegoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Riego con id ${id} no encontrado`);
    }
  }
}
