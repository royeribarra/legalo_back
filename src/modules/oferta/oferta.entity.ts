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
import { FileEntity } from '../tmp/file.entity';

@Entity({ name: 'ofertas' })
export class OfertasEntity extends BaseEntity implements IOferta {
  @Column({nullable: true})
  uso: string;

  @Column({nullable: true})
  titulo: string;

  @Column('text')
  descripcion: string;

  @Column({ nullable: true })
  documento_url: string;

  @Column({nullable: true})
  duracion: string;

  @Column({nullable: true})
  experiencia_abogado: string;

  @Column({nullable: true})
  salario_minimo: string;

  @Column({nullable: true})
  salario_maximo: string;

  @Column({nullable: true})
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

  @OneToMany(() => InvitacionesEntity, (invitacion) => invitacion.oferta)
  invitaciones: InvitacionesEntity[];

  @OneToMany(() => FileEntity, (file) => file.oferta, { cascade: true })
  files: FileEntity[];
}
