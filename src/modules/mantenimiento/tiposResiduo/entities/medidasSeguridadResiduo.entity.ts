import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IPropiedadResiduo } from '../../../../interfaces/mantenimiento/residuos/propiedadResiduo.interface';
import { TiposResiduoMedidasSeguridadEntity } from './tipoResiduoMedidaSeguridad.entity';

@Entity({name:'medidasSeguridadResiduo'})
export class MedidasSeguridadResiduoEntity extends BaseEntity implements IPropiedadResiduo{

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  valor: number;

  @ManyToOne(() => TiposResiduoMedidasSeguridadEntity, tipo => tipo.medidaSeguridad)
  tiposResiduo: TiposResiduoMedidasSeguridadEntity;
}