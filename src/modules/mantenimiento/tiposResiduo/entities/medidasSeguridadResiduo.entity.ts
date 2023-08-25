import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IPropiedadResiduo } from '../../../../interfaces/mantenimiento/residuos/propiedadResiduo.interface';
import { TiposResiduoMedidasSeguridadEntity } from './tipoResiduoMedidaSeguridad.entity';

@Entity({name:'medidas_seguridad_residuo'})
export class MedidasSeguridadResiduoEntity extends BaseEntity implements IPropiedadResiduo
{
  @Column()
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column()
  valor: number;

  @ManyToOne(() => TiposResiduoMedidasSeguridadEntity, tipo => tipo.medidaSeguridad)
  tiposResiduo: TiposResiduoMedidasSeguridadEntity;
}