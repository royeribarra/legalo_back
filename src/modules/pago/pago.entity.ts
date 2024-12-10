import { Entity, Column, ManyToOne, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { IOferta } from '../../interfaces/Oferta.interface';
import { EspecialidadesEntity } from '../especialidad/especialidades.entity';
import { ServiciosEntity } from '../servicio/servicios.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { PreguntasOfertaEntity } from '../preguntas_oferta/preguntasOferta.entity';
import { ServiciosOfertaEntity } from '../servicio/servicioOferta.entity';
import { IndustriasOfertaEntity } from '../industria/industriaOferta.entity';
import { EspecialidadesOfertaEntity } from '../especialidad/especialidadOferta.entity';
import { IPago } from 'src/interfaces/Pago.interface';
import { OfertasEntity } from '../oferta/oferta.entity';

@Entity({ name: 'pagos' })
export class PagosEntity extends BaseEntity implements IPago {
  @Column()
  fecha_operacion: string;

  @Column({ nullable: true })
  clienteId: number;

  @Column({ nullable: true })
  abogadoId: number;

  @Column()
  ofertaId: number;

  @Column({ nullable: true })
  operacion: string;

  @OneToOne(() => OfertasEntity, { cascade: true })
  @JoinColumn()
  oferta: OfertasEntity;
}
