import { Entity, Column, ManyToOne, Index, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';

@Entity({ name: 'pagos' })
export class PagosEntity extends BaseEntity {
  @Column()
  monto_total: number; // Monto total del pago realizado por el cliente

  @Column({ nullable: true })
  monto_abogado: number; // Monto que le corresponde al abogado

  @Column({ nullable: true })
  direccionFactura: string;

  @Column({ nullable: true })
  nombreFactura: string;

  @Column()
  operacion: string; // Código de operación del pago

  @Column({ nullable: true })
  ruc: string; // RUC para facturación

  @Column()
  tipoComprobante: string; // Tipo de comprobante (factura, boleta, etc.)

  @Column()
  tipoPago: string; // Método de pago (transferencia, tarjeta, etc.)

  @Column()
  fecha_operacion: string; // Fecha en la que se realizó el pago

  @Column()
  estado: string; // Estado del pago (Pendiente, Procesado, Pagado, etc.)

  // Relación con el Trabajo (Cada pago está asociado a un trabajo)
  @ManyToOne(() => TrabajosEntity, (trabajo) => trabajo.pagos, {
    onDelete: 'CASCADE',
  })
  trabajo: TrabajosEntity;

  // Relación con el Cliente (Cliente que realizó el pago)
  @ManyToOne(() => ClientesEntity, (cliente) => cliente.pagos, {
    onDelete: 'CASCADE',
  })
  cliente: ClientesEntity;

  // Relación con el Abogado (Abogado que recibe el pago)
  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.pagos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'abogado_id' })
  @Index('idx_pagos_abogado')
  abogado: AbogadosEntity;
}