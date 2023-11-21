import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IUnidadMedidaResiduo } from '../../../../interfaces/mantenimiento/residuos/unidadMedidadResiduo.interface';
import { TiposResiduoEntity } from './tiposResiduo.entity';
import { VehiculosEntity } from '../../vehiculos/entities/vehiculo.entity';
import { VehiculoUnidadMedidaEntity } from '../../vehiculos/entities/vehiculoUnidadMedida.entity';

@Entity({name:'unidades_medida_residuo'})
export class UnidadesMedidaResiduoEntity extends BaseEntity implements IUnidadMedidaResiduo
{
  @Column()
  unidadMedida: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  factorConversion: number;

  @OneToMany(() => TiposResiduoEntity, tipo => tipo.residuos)
  tiposResiduo: TiposResiduoEntity;

  @OneToMany(() => VehiculoUnidadMedidaEntity, tipo => tipo.unidadMedida)
  vehiculos: VehiculoUnidadMedidaEntity;
}