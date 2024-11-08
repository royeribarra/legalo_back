
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../src/config/base.entity';
import { IAplicacion } from '../../../src/interfaces/Aplicacion.interface';
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

  @OneToOne(() => OfertasEntity, (oferta) => oferta.aplicaciones)
  oferta: OfertasEntity;

  @OneToOne(() => AbogadosEntity, (abogado) => abogado.aplicaciones)
  abogado: AbogadosEntity;

  @OneToOne(() => TrabajosEntity, (trabajo) => trabajo.aplicacion)
  trabajo: TrabajosEntity;
}