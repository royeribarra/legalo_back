import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from '../../../src/config/base.entity';
import { ITrabajo } from '../../../src/interfaces/Trabajo.interface';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';

@Entity()
export class TrabajosEntity extends BaseEntity implements ITrabajo{
  @Column()
  estado: number;

  @Column()
  fecha_fin: string;

  @Column()
  fecha_inicio: string;

  @ManyToOne(() => ClientesEntity, (cliente) => cliente.trabajos)
  cliente: ClientesEntity;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.trabajos)
  abogado: AbogadosEntity;

  @OneToOne(() => AplicacionesEntity, (aplicacion) => aplicacion.trabajo)
  aplicacion: AplicacionesEntity;
}