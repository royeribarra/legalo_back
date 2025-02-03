import { Entity, Column, ManyToOne, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { IPago } from 'src/interfaces/Pago.interface';
import { OfertasEntity } from '../oferta/oferta.entity';
import { TrabajosEntity } from '../trabajo/trabajos.entity';

@Entity({ name: 'pagos' })
export class PagosEntity extends BaseEntity implements IPago 
{
  @Column({nullable: true})
  direccionFactura: string;

  @Column()
  monto: number;

  @Column({nullable: true})
  nombreFactura: string;

  @Column()
  operacion: string;

  @Column({nullable: true})
  ruc: string;

  @Column()
  tipoComprobante: string;

  @Column()
  tipoPago: string;

  @Column()
  fecha_operacion: string;

  @Column()
  estado: string;

  @Column({ nullable: true })
  clienteId: number;

  @Column({ nullable: true })
  abogadoId: number;

  @Column({ nullable: true })
  ofertaId: number;

  @OneToOne(() => AplicacionesEntity, { cascade: true })
  @JoinColumn()
  aplicacion: AplicacionesEntity;

  @OneToOne(() => OfertasEntity, { cascade: true })
  @JoinColumn()
  oferta: OfertasEntity;

  @ManyToOne(() => TrabajosEntity, (trabajo) => trabajo.pagos)
  trabajo: TrabajosEntity;  // Relación con la entidad Trabajo (muchos pagos a un trabajo)
}
