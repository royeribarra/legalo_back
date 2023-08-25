import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../config/base.entity';
import { TiposResiduoEntity } from './tiposResiduo.entity';
import { PropiedadesResiduoEntity } from './propiedadesResiduo.entity';

@Entity({ name: 'tipos_residuo_propiedades' })
export class TiposResiduoPropiedadesEntity extends BaseEntity
{
  @ManyToOne(()=> PropiedadesResiduoEntity, (propiedad)=> propiedad.tiposResiduo)
  propiedad: PropiedadesResiduoEntity;

  @ManyToOne(() => TiposResiduoEntity, (tipo)=> tipo.propiedades)
  tipoResiduo: TiposResiduoEntity;
}