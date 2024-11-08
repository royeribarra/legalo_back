
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { IAbogado } from '../../../../src/interfaces/Abogado.interface';
import { UsuariosEntity } from '../../../../src/modules/usuario/usuarios.entity';
import { BaseEntity } from '../../../../src/config/base.entity';
import { HabilidadesBlandaEntity } from '../../../../src/modules/habilidadBlanda/habilidadesBlanda.entity';
import { HabilidadesDuraEntity } from '../../../../src/modules/habilidadDura/habilidadesDura.entity';
import { IndustriasEntity } from '../../../../src/modules/industria/industrias.entity';
import { ServiciosEntity } from '../../../../src/modules/servicio/servicios.entity';
import { ExperienciasEntity } from '../../../../src/modules/experiencia/experiencias.entity';
import { EducacionesEntity } from '../../../../src/modules/educacion/educaciones.entity';
import { EspecialidadesEntity } from '../../../../src/modules/especialidad/especialidades.entity';
import { AplicacionesEntity } from '../../../../src/modules/aplicacion/aplicaciones.entity';
import { TrabajosEntity } from '../../../../src/modules/trabajo/trabajos.entity';

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