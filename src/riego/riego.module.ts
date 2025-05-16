import { Module } from '@nestjs/common';
import { RiegoService } from './riego.service';
import { RiegoController } from './riego.controller';
import { Riego } from './entities/riego.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Riego])],
  controllers: [RiegoController],
  providers: [RiegoService],
})
export class RiegoModule {}
