import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';

@Entity()
export class IndustriasEntity {
  @Column()
  nombre: string;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.habilidadesBlandas)
  abogado: AbogadosEntity;
}