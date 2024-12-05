
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { IAplicacion } from '../../interfaces/Aplicacion.interface';
import { OfertasEntity } from '../oferta/oferta.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { TrabajosEntity } from '../trabajo/trabajos.entity';

@Entity({name:'aplicaciones'})
export class AplicacionesEntity extends BaseEntity implements IAplicacion
{
  @Column()
  fecha_aplicacion: string;

  @Column()
  status: number;

  @Column()
  salarioEsperado: number;

  @ManyToOne(() => OfertasEntity, (oferta) => oferta.aplicaciones)
  @JoinColumn({ name: 'oferta_id' })
  oferta: OfertasEntity;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.aplicaciones)
  abogado: AbogadosEntity;

  @OneToOne(() => TrabajosEntity, (trabajo) => trabajo.aplicacion)
  trabajo: TrabajosEntity;
}