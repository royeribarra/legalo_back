import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from 'src/config/base.entity';
import { IExperiencia } from 'src/interfaces/Experiencia.interface';
import { ITrabajo } from 'src/interfaces/Trabajo.interface';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';

@Entity()
export class TrabajosEntity extends BaseEntity implements ITrabajo{
  @Column()
  estado: number;

  @Column()
  fecha_fin: string;

  @Column()
  fecha_inicio: string;

  @OneToOne(() => AplicacionesEntity, (aplicacion) => aplicacion.trabajo)
  aplicacion: AplicacionesEntity;
}