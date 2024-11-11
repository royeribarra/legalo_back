import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from '../../../src/config/base.entity';
import { IExperiencia } from '../../../src/interfaces/Experiencia.interface';

@Entity()
export class ExperienciasEntity extends BaseEntity implements IExperiencia{
  @Column()
  fecha_fin: string;

  @Column()
  fecha_inicio: string;

  @Column()
  titulo: string;

  @Column()
  institucion: string;

  @Column()
  descripcion: string;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.habilidadesBlandas)
  abogado: AbogadosEntity;
}