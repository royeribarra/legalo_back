import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { TrabajosEntity } from '../trabajo/trabajos.entity';

@Entity({ name: 'progresos_trabajo' })
export class ProgresoTrabajoEntity extends BaseEntity {
  @Column({nullable: true})
  descripcion: string;

  @Column({ nullable: true })
  progreso: number;

  @Column({ nullable: true })
  documento: string;

  @Column()
  estado: string;

  @ManyToOne(() => TrabajosEntity, (trabajo) => trabajo.progreso)
  trabajo: TrabajosEntity;
}