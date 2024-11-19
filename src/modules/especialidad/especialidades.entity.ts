import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from '../../../src/config/base.entity';
import { IEspecialidad } from '../../../src/interfaces/Especialidad.interface';
import { OfertasEntity } from '../oferta/oferta.entity';

@Entity({name:'especialidades'})
export class EspecialidadesEntity extends BaseEntity implements IEspecialidad{
  @Column()
  nombre: string;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.habilidadesBlandas)
  abogado: AbogadosEntity;

  @ManyToMany(() => OfertasEntity, (oferta) => oferta.especialidades)
  ofertas: OfertasEntity[];
}