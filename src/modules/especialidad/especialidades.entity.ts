import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { IEspecialidad } from '../../interfaces/Especialidad.interface';
import { EspecialidadesAbogadoEntity } from './especialidadAbogado.entity';
import { EspecialidadesOfertaEntity } from './especialidadOferta.entity';

@Entity({name:'especialidades'})
export class EspecialidadesEntity extends BaseEntity implements IEspecialidad{
  @Column()
  nombre: string;

  @Column()
  imagen: string;

  @Column({type: 'text'})
  descripcion: string;

  @OneToMany(() => EspecialidadesAbogadoEntity, (servicioAbogado) => servicioAbogado.especialidad)
  especialidadesAbogado: EspecialidadesAbogadoEntity[];

  @OneToMany(() => EspecialidadesOfertaEntity, (servicioOferta) => servicioOferta.especialidad)
  especialidadesOferta: EspecialidadesOfertaEntity[];
}