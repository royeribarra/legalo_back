import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from '../../config/base.entity';
import { IEducacion } from '../../interfaces/Educacion.interface';

@Entity({name:'educaciones'})
export class EducacionesEntity extends BaseEntity implements IEducacion{
  @Column()
  fecha_fin: string;

  @Column()
  fecha_inicio: string;

  @Column()
  titulo: string;

  @Column()
  institucion: string;

  @Column()
  ubicacion: string;

  @Column({nullable: true})
  descripcion: string;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.habilidadesBlandas)
  abogado: AbogadosEntity;
}