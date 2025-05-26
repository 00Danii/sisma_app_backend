import { Injectable } from '@nestjs/common';
// import { CreateFertilizanteDto } from './dto/create-fertilizante.dto';
// import { UpdateFertilizanteDto } from './dto/update-fertilizante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fertilizante } from './entities/fertilizante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FertilizanteService {
  private modoActual: 'manual' | 'automatico' = 'manual';
  private bombaActiva: boolean = false;

  constructor(
    @InjectRepository(Fertilizante)
    private readonly fertilizanteRepository: Repository<Fertilizante>,
  ) {}

  getModoActual() {
    return { modo: this.modoActual, activar: this.bombaActiva };
  }

  setModo(data: { modo: 'manual' | 'automatico'; activar?: boolean }) {
    this.modoActual = data.modo;

    if (data.modo === 'manual') {
      this.bombaActiva = data.activar ?? false;
    } else {
      this.bombaActiva = false; // seguridad: apagamos bomba en automático
    }

    return {
      message: `Modo actualizado a ${data.modo}`,
      activar: this.bombaActiva,
    };
  }

  // create(createFertilizanteDto: CreateFertilizanteDto) {
  //   return 'This action adds a new fertilizante';
  // }

  // findAll() {
  //   return `This action returns all fertilizante`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} fertilizante`;
  // }

  // update(id: number, updateFertilizanteDto: UpdateFertilizanteDto) {
  //   return `This action updates a #${id} fertilizante`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} fertilizante`;
  // }
}
