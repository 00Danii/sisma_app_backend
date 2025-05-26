import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Planta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  imagen: string;

  @Column({ nullable: true })
  nombreCientifico: string;

  @Column({ type: 'enum', enum: ['jardin', 'cultivo', 'hierba', 'frutal'] })
  tipo: 'jardin' | 'cultivo' | 'hierba' | 'frutal';

  @Column({ type: 'enum', enum: ['facil', 'intermedio', 'dificil'] })
  dificultad: 'facil' | 'intermedio' | 'dificil';

  @Column({ type: 'text' })
  caracteristicas: string;

  @Column({ type: 'text' })
  cuidados: string;

  @Column({ type: 'text' })
  beneficios: string;

  @Column('float')
  riegoMinimo: number;

  @Column('float')
  riegoMaximo: number;

  @Column('float')
  humedadSuelo: number;

  @Column({ type: 'enum', enum: ['pleno-sol', 'sombra-parcial', 'sombra'] })
  exposicionSolar: 'pleno-sol' | 'sombra-parcial' | 'sombra';

  @Column('text', { array: true, nullable: true })
  temporadaSiembra: string[];

  @Column('text', { array: true, nullable: true })
  plagasComunes: string[];

  @Column('text', { array: true, nullable: true })
  enfermedadesComunes: string[];
}
