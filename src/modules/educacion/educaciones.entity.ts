import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, JoinColumn } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from '../../config/base.entity';
import { IEducacion } from '../../interfaces/Educacion.interface';

@Entity({name:'educaciones'})
export class EducacionesEntity extends BaseEntity implements IEducacion{
  @Column({ type: 'date', nullable: true })
  fecha_fin: Date;

  @Column({ type: 'date', nullable: true })
  fecha_inicio: Date;

  @Column()
  titulo: string;

  @Column()
  institucion: string;

  @Column()
  ubicacion: string;

  @Column({nullable: true})
  descripcion: string;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.educaciones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'abogado_id' })
  @Index('idx_educaciones_abogado')
  abogado: AbogadosEntity;
}