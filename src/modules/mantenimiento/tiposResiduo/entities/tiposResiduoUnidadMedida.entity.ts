import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../config/base.entity';
import { TiposResiduoEntity } from './tiposResiduo.entity';
import { UnidadesMedidaResiduoEntity } from './unidadesMedidaResiduo.entity';

@Entity({ name: 'tiposResiduo_unidadesMedida' })
export class TiposResiduoUnidadMedidaEntity extends BaseEntity
{
  @ManyToOne(()=> UnidadesMedidaResiduoEntity, (unidad)=> unidad.tiposResiduo)
  unidadMedida: UnidadesMedidaResiduoEntity;

  @ManyToOne(() => TiposResiduoEntity, (tipo)=> tipo.unidadesMedida)
  tipoResiduo: TiposResiduoEntity;
}