import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from '../../../src/config/base.entity';
import { IHabilidaBlanda } from '../../../src/interfaces/HabilidadBlanda.interface';

@Entity()
export class HabilidadesBlandaEntity extends BaseEntity implements IHabilidaBlanda{
  @Column()
  nombre: string;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.habilidadesBlandas)
  abogado: AbogadosEntity;
}