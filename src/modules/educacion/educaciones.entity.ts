import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from '../../../src/config/base.entity';
import { IEducacion } from '../../../src/interfaces/Educacion.interface';

@Entity()
export class EducacionesEntity extends BaseEntity implements IEducacion{
  @Column({name:'educaciones'})
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