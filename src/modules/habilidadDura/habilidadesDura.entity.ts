import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, JoinColumn } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from '../../config/base.entity';
import { IHabilidadDura } from '../../interfaces/HabilidadDura.interface';

@Entity({name:'habilidades_duras'})
export class HabilidadesDuraEntity extends BaseEntity implements IHabilidadDura{
  @Column()
  nombre: string;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.habilidadesDuras, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'abogado_id' })
  @Index('idx_habilidades_dura_abogado')
  abogado: AbogadosEntity;
}