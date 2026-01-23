import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { BaseEntity } from '../../config/base.entity';
import { IHabilidaBlanda } from '../../interfaces/HabilidadBlanda.interface';

@Entity({name:'habilidades_blandas'})
export class HabilidadesBlandaEntity extends BaseEntity implements IHabilidaBlanda{
  @Column()
  nombre: string;

  @ManyToOne(() => AbogadosEntity, (abogado) => abogado.habilidadesBlandas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'abogado_id' })
  @Index('idx_habilidades_blanda_abogado')
  abogado: AbogadosEntity;
}