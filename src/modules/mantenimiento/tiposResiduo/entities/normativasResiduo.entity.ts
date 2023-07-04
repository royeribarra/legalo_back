import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IPropiedadResiduo } from '../../../../interfaces/mantenimiento/residuos/propiedadResiduo.interface';
import { TiposResiduoNormativasEntity } from './tipoResiduoNormativa.entity';

@Entity({name:'normativasResiduo'})
export class NormativasResiduoEntity extends BaseEntity implements IPropiedadResiduo{

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  valor: number;

  @ManyToOne(() => TiposResiduoNormativasEntity, tipo => tipo.normativa)
  tiposResiduo: TiposResiduoNormativasEntity;
}