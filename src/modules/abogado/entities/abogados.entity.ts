
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { IAbogado } from '../../../interfaces/Abogado.interface';
import { UsuariosEntity } from '../../usuario/usuarios.entity';
import { BaseEntity } from '../../../config/base.entity';
import { HabilidadesBlandaEntity } from '../../habilidadBlanda/habilidadesBlanda.entity';
import { HabilidadesDuraEntity } from '../../habilidadDura/habilidadesDura.entity';
import { ExperienciasEntity } from '../../experiencia/experiencias.entity';
import { EducacionesEntity } from '../../educacion/educaciones.entity';
import { AplicacionesEntity } from '../../aplicacion/aplicaciones.entity';
import { TrabajosEntity } from '../../trabajo/trabajos.entity';
import { ServiciosAbogadoEntity } from '../../servicio/servicioAbogado.entity';
import { EspecialidadesAbogadoEntity } from '../../especialidad/especialidadAbogado.entity';
import { IndustriasAbogadoEntity } from '../../industria/industriaAbogado.entity';
import { InvitacionesEntity } from '../../oferta/invitacion.entity';
import { FileEntity } from '../../tmp/file.entity';
import { PagosEntity } from '../../pago/pago.entity';

@Entity({name:'abogados'})
export class AbogadosEntity extends BaseEntity implements IAbogado
{
  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  dni: string;

  @Column()
  direccion: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @Column()
  sobre_ti: string;

  @Column({nullable: true})
  cip: string;

  @Column({nullable: true})
  colegio: string;

  @Column()
  grado_academico: string;

  @Column({nullable: true})
  objetivo: string;

  @Column({default: false})
  validado_admin: boolean;

  @OneToMany(() => HabilidadesBlandaEntity, (habilidad) => habilidad.abogado, { cascade: true })
  habilidadesBlandas: HabilidadesBlandaEntity[];

  @OneToMany(() => HabilidadesDuraEntity, (habilidad) => habilidad.abogado, { cascade: true })
  habilidadesDuras: HabilidadesDuraEntity[];

  @OneToMany(() => IndustriasAbogadoEntity, (industriaAbogado) => industriaAbogado.abogado, { cascade: true })
  industriasAbogado: IndustriasAbogadoEntity[];

  @OneToMany(() => ServiciosAbogadoEntity, (servicioAbogado) => servicioAbogado.abogado, { cascade: true })
  serviciosAbogado: ServiciosAbogadoEntity[];

  @OneToMany(() => EspecialidadesAbogadoEntity, (especialidadAbogado) => especialidadAbogado.abogado, { cascade: true })
  especialidadesAbogado: EspecialidadesAbogadoEntity[];

  @OneToMany(() => ExperienciasEntity, (experiencia) => experiencia.abogado, { cascade: true })
  experiencias: ExperienciasEntity[];

  @OneToMany(() => EducacionesEntity, (educacion) => educacion.abogado, { cascade: true })
  educaciones: EducacionesEntity[];

  @OneToOne(() => UsuariosEntity, (usuario) => usuario.abogado)
  usuario: UsuariosEntity;

  @OneToMany(() => AplicacionesEntity, (aplicacion) => aplicacion.abogado, { cascade: true })
  aplicaciones: AplicacionesEntity[];

  @OneToMany(() => TrabajosEntity, (trabajo) => trabajo.abogado, { cascade: true })
  trabajos: TrabajosEntity[];

  @OneToMany(() => InvitacionesEntity, (invitacion) => invitacion.abogado, { cascade: true })
  invitaciones: InvitacionesEntity[];

  @OneToMany(() => FileEntity, (file) => file.abogado, { cascade: true })
  files: FileEntity[];

  @OneToMany(() => PagosEntity, (pago) => pago.cliente)
  pagos: PagosEntity[];
}