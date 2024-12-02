import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from '../../config/base.entity';
import { IIndutria } from '../../interfaces/Industria.interface';
import { IndustriasAbogadoEntity } from './industriaAbogado.entity';
import { IndustriasOfertaEntity } from './industriaOferta.entity';

@Entity({name:'industrias'})
export class IndustriasEntity extends BaseEntity implements IIndutria{
  @Column()
  nombre: string;

  @OneToMany(() => IndustriasAbogadoEntity, (industriaAbogado) => industriaAbogado.industria)
  industriasAbogado: IndustriasAbogadoEntity[];

  @OneToMany(() => IndustriasOfertaEntity, (industriaOferta) => industriaOferta.industria)
  industriasOferta: IndustriasOfertaEntity[];
}