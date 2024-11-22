
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { IAbogado } from '../../../interfaces/Abogado.interface';
import { UsuariosEntity } from '../../usuario/usuarios.entity';
import { BaseEntity } from '../../../config/base.entity';
import { HabilidadesBlandaEntity } from '../../habilidadBlanda/habilidadesBlanda.entity';
import { HabilidadesDuraEntity } from '../../habilidadDura/habilidadesDura.entity';
import { IndustriasEntity } from '../../industria/industrias.entity';
import { ServiciosEntity } from '../../servicio/servicios.entity';
import { ExperienciasEntity } from '../../experiencia/experiencias.entity';
import { EducacionesEntity } from '../../educacion/educaciones.entity';
import { EspecialidadesEntity } from '../../especialidad/especialidades.entity';
import { AplicacionesEntity } from '../../aplicacion/aplicaciones.entity';
import { TrabajosEntity } from '../../trabajo/trabajos.entity';

@Entity({name:'abogados'})
export class AbogadosEntity extends BaseEntity implements IAbogado
{
  @Column()
  nombres: string;

  @Column()
  apellidos: string;

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

  @Column()
  video_url: string;

  @Column()
  cul_url: string;

  @Column()
  foto_url: string;

  @Column()
  pdf_url: string;

  @OneToMany(() => HabilidadesBlandaEntity, (habilidad) => habilidad.abogado)
  habilidadesBlandas: HabilidadesBlandaEntity[];

  @OneToMany(() => HabilidadesDuraEntity, (habilidad) => habilidad.abogado)
  habilidadesDuras: HabilidadesDuraEntity[];

  @OneToMany(() => IndustriasEntity, (industria) => industria.abogado)
  industrias: IndustriasEntity[];

  @OneToMany(() => ServiciosEntity, (servicio) => servicio.abogado)
  servicios: ServiciosEntity[];

  @OneToMany(() => ExperienciasEntity, (experiencia) => experiencia.abogado)
  experiencias: ExperienciasEntity[];

  @OneToMany(() => EducacionesEntity, (educacion) => educacion.abogado)
  educaciones: EducacionesEntity[];

  @OneToMany(() => EspecialidadesEntity, (especialidad) => especialidad.abogado)
  especialidades: EspecialidadesEntity[];

  @OneToOne(() => UsuariosEntity, (usuario) => usuario.abogado)
  usuario: UsuariosEntity;

  @OneToMany(() => AplicacionesEntity, (aplicacion) => aplicacion.abogado)
  aplicaciones: AplicacionesEntity[];

  @OneToMany(() => TrabajosEntity, (trabajo) => trabajo.abogado)
  trabajos: TrabajosEntity[];
}