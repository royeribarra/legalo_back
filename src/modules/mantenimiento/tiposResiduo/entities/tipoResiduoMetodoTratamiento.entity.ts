import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../config/base.entity';
import { TiposResiduoEntity } from './tiposResiduo.entity';
import { MetodosTratamientoResiduoEntity } from './metodosTratamientoResiduo.entity';

@Entity({ name: 'tipos_residuo_metodos_tratamiento' })
export class TiposResiduoMetodosTratamientoEntity extends BaseEntity
{

  @ManyToOne(()=> MetodosTratamientoResiduoEntity, (metodo)=> metodo.tiposResiduo)
  metodoTratamiento: MetodosTratamientoResiduoEntity;

  @ManyToOne(() => TiposResiduoEntity, (tipo)=> tipo.metodosTratamiento)
  tipoResiduo: TiposResiduoEntity;
}