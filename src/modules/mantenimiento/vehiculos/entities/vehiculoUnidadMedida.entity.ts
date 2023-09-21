import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../config/base.entity';
import { VehiculosEntity } from './vehiculo.entity';
import { UnidadesMedidaResiduoEntity } from '../../tiposResiduo/entities/unidadesMedidaResiduo.entity';

@Entity({ name: 'vehiculos_unidades_medida' })
export class VehiculoUnidadMedidaEntity extends BaseEntity
{
  @ManyToOne(()=> UnidadesMedidaResiduoEntity, (unidad)=> unidad.vehiculos)
  unidadMedida: UnidadesMedidaResiduoEntity;

  @ManyToOne(() => VehiculosEntity, (vehiculo)=> vehiculo.unidadesMedida)
  vehiculo: VehiculosEntity;
}