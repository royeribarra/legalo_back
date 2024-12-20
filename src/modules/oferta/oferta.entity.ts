import { Entity, Column, ManyToOne, ManyToMany, JoinTable, OneToMany, OneToOne } from 'typeorm';
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
import { PagosEntity } from '../pago/pago.entity';
import { InvitacionesEntity } from './invitacion.entity';

@Entity({ name: 'ofertas' })
export class OfertasEntity extends BaseEntity implements IOferta {
  @Column()
  uso: string;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column({ nullable: true })
  documento_url: string;

  @Column()
  duracion: string;

  @Column()
  experiencia_abogado: string;

  @Column()
  salario_minimo: string;

  @Column()
  salario_maximo: string;

  @Column()
  estado: string;

  @Column({nullable: true})
  fecha_expiracion: string;

  @Column({nullable: true, default: false })
  expirado: boolean;

  @OneToMany(() => EspecialidadesOfertaEntity, (especialidadOferta) => especialidadOferta.oferta)
  especialidadesOferta: EspecialidadesOfertaEntity[];

  @OneToMany(() => ServiciosOfertaEntity, (servicioOferta) => servicioOferta.oferta)
  serviciosOferta: ServiciosOfertaEntity[];

  @OneToMany(() => IndustriasOfertaEntity, (industriaOferta) => industriaOferta.oferta)
  industriasOferta: IndustriasOfertaEntity[];

  @ManyToOne(() => ClientesEntity, (cliente) => cliente.ofertas)
  cliente: ClientesEntity;

  @OneToMany(() => AplicacionesEntity, (aplicacion) => aplicacion.oferta)
  aplicaciones: AplicacionesEntity[];

  @OneToMany(() => PreguntasOfertaEntity, (pregunta) => pregunta.ofertas, {
    cascade: true,
  })
  preguntas_oferta: PreguntasOfertaEntity[];

  @OneToOne(() => PagosEntity, (pago) => pago.oferta) // Relación bidireccional
  pago: PagosEntity;

  @OneToMany(() => InvitacionesEntity, (invitacion) => invitacion.oferta)
  invitaciones: InvitacionesEntity[];
}
