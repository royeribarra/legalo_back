import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from '../../config/base.entity';
import { IHabilidaBlanda } from '../../interfaces/HabilidadBlanda.interface';

@Entity({name:'habilidades_blandas'})
export class HabilidadesBlandaEntity extends BaseEntity implements IHabilidaBlanda{
  @Column()
  nombre: string;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.habilidadesBlandas, {
    onDelete: 'CASCADE',
  })
  abogado: AbogadosEntity;
}