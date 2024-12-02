
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
  sobre_ti: string;

  @Column({nullable: true})
  cip: string;

  @Column({nullable: true})
  colegio: string;

  @Column()
  grado_academico: string;

  @Column({nullable: true})
  video_url: string;

  @Column({nullable: true})
  cul_url: string;

  @Column({nullable: true})
  foto_url: string;

  @Column({nullable: true})
  cv_url: string;

  @OneToMany(() => HabilidadesBlandaEntity, (habilidad) => habilidad.abogado)
  habilidadesBlandas: HabilidadesBlandaEntity[];

  @OneToMany(() => HabilidadesDuraEntity, (habilidad) => habilidad.abogado)
  habilidadesDuras: HabilidadesDuraEntity[];

  @OneToMany(() => IndustriasAbogadoEntity, (industria) => industria.abogado)
  industriasAbogado: IndustriasAbogadoEntity[];

  @OneToMany(() => ServiciosAbogadoEntity, (servicioAbogado) => servicioAbogado.abogado)
  serviciosAbogado: ServiciosAbogadoEntity[];

  @OneToMany(() => ExperienciasEntity, (experiencia) => experiencia.abogado)
  experiencias: ExperienciasEntity[];

  @OneToMany(() => EducacionesEntity, (educacion) => educacion.abogado)
  educaciones: EducacionesEntity[];

  @OneToMany(() => EspecialidadesAbogadoEntity, (especialidad) => especialidad.abogado)
  especialidadesAbogado: EspecialidadesAbogadoEntity[];

  @OneToOne(() => UsuariosEntity, (usuario) => usuario.abogado)
  usuario: UsuariosEntity;

  @OneToMany(() => AplicacionesEntity, (aplicacion) => aplicacion.abogado)
  aplicaciones: AplicacionesEntity[];

  @OneToMany(() => TrabajosEntity, (trabajo) => trabajo.abogado)
  trabajos: TrabajosEntity[];
}