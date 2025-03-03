import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';

@Entity({ name: 'pagos_abogado' })
export class PagosAbogadoEntity extends BaseEntity {
  @Column()
  monto: number;

  @Column()
  operacion: string;

  @Column({ nullable: true})
  tipoPago: string;

  @Column()
  fecha_operacion: string;

  @Column()
  estado: string;

  @ManyToOne(() => TrabajosEntity, (trabajo) => trabajo.pagosAbogado)
  trabajo: TrabajosEntity;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.pagos)
  abogado: AbogadosEntity;
}