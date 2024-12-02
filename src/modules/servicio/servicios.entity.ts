import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from '../../config/base.entity';
import { IServicio } from '../../interfaces/Servicio.interface';
import { OfertasEntity } from '../oferta/oferta.entity';
import { ServiciosAbogadoEntity } from './servicioAbogado.entity';
import { ServiciosOfertaEntity } from './servicioOferta.entity';

@Entity({name: 'servicios'})
export class ServiciosEntity extends BaseEntity implements IServicio{
  @Column()
  nombre: string;

  @OneToMany(() => ServiciosAbogadoEntity, (servicioAbogado) => servicioAbogado.servicio)
  serviciosAbogado: ServiciosAbogadoEntity[];

  @OneToMany(() => ServiciosOfertaEntity, (servicioOferta) => servicioOferta.servicio)
  serviciosOferta: ServiciosOfertaEntity[];
}