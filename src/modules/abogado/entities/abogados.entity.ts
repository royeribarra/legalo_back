import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
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
import { IsEmail, Matches } from 'class-validator';

@Index(['validado_admin', 'createdAt'])
@Entity({name:'abogados'})
export class AbogadosEntity extends BaseEntity implements IAbogado
{
  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  @Matches(/^\d{8}$/, { message: 'DNI must be an 8-digit number' })
  dni: string;

  @Column()
  direccion: string;

  @Column()
  @IsEmail()
  correo: string;

  @Column()
  telefono: string;

  @Column()
  sobre_ti: string;

  @Column({nullable: true})
  cip: string;

  @Column({nullable: true})
  ruc: string;

  @Column({nullable: true})
  colegio: string;

  @Column()
  grado_academico: string;

  @Column({nullable: true})
  objetivo: string;

  @Column({default: false})
  validado_admin: boolean;

  @OneToMany(() => HabilidadesBlandaEntity, (habilidad) => habilidad.abogado, {
    cascade: ['remove']
  })
  habilidadesBlandas: HabilidadesBlandaEntity[];

  @OneToMany(() => HabilidadesDuraEntity, (habilidad) => habilidad.abogado, {
    cascade: ['remove']
  })
  habilidadesDuras: HabilidadesDuraEntity[];

  @OneToMany(() => IndustriasAbogadoEntity, (industriaAbogado) => industriaAbogado.abogado, {
    cascade: ['remove']
  })
  industriasAbogado: IndustriasAbogadoEntity[];

  @OneToMany(() => ServiciosAbogadoEntity, (servicioAbogado) => servicioAbogado.abogado, {
    cascade: ['remove']
  })
  serviciosAbogado: ServiciosAbogadoEntity[];

  @OneToMany(() => EspecialidadesAbogadoEntity, (especialidadAbogado) => especialidadAbogado.abogado, {
    cascade: ['remove']
  })
  especialidadesAbogado: EspecialidadesAbogadoEntity[];

  @OneToMany(() => ExperienciasEntity, (experiencia) => experiencia.abogado, {
    cascade: ['remove']
  })
  experiencias: ExperienciasEntity[];

  @OneToMany(() => EducacionesEntity, (educacion) => educacion.abogado, {
    cascade: ['remove']
  })
  educaciones: EducacionesEntity[];

  @OneToOne(() => UsuariosEntity, (usuario) => usuario.abogado)
  usuario: UsuariosEntity;

  @OneToMany(() => AplicacionesEntity, (aplicacion) => aplicacion.abogado, {
    cascade: ['remove']
  })
  aplicaciones: AplicacionesEntity[];

  @OneToMany(() => TrabajosEntity, (trabajo) => trabajo.abogado, {
    cascade: ['remove']
  })
  trabajos: TrabajosEntity[];

  @OneToMany(() => InvitacionesEntity, (invitacion) => invitacion.abogado, {
    cascade: ['remove']
  })
  invitaciones: InvitacionesEntity[];

  @OneToMany(() => FileEntity, (file) => file.abogado, {
    cascade: ['remove']
  })
  files: FileEntity[];

  @OneToMany(() => PagosEntity, (pago) => pago.abogado, {
    cascade: ['remove']
  })
  pagos: PagosEntity[];
}