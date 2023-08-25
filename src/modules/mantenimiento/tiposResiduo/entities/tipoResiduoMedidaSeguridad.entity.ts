import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../config/base.entity';
import { MedidasSeguridadResiduoEntity } from './medidasSeguridadResiduo.entity';
import { TiposResiduoEntity } from './tiposResiduo.entity';

@Entity({ name: 'tipos_residuo_medidas_seguridad' })
export class TiposResiduoMedidasSeguridadEntity extends BaseEntity
{

  @ManyToOne(()=> MedidasSeguridadResiduoEntity, (medida)=> medida.tiposResiduo)
  medidaSeguridad: MedidasSeguridadResiduoEntity;

  @ManyToOne(() => TiposResiduoEntity, (tipo)=> tipo.medidasSeguridad)
  tipoResiduo: TiposResiduoEntity;
}