import { Module } from '@nestjs/common';
import { FertilizanteService } from './fertilizante.service';
import { FertilizanteController } from './fertilizante.controller';
import { Fertilizante } from './entities/fertilizante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Fertilizante])],
  controllers: [FertilizanteController],
  providers: [FertilizanteService],
})
export class FertilizanteModule {}
