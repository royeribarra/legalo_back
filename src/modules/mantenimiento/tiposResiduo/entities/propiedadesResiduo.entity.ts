import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IPropiedadResiduo } from '../../../../interfaces/mantenimiento/residuos/propiedadResiduo.interface';
import { TiposResiduoPropiedadesEntity } from './tipoResiduoPropiedad.entity';

@Entity({name:'propiedadesResiduo'})
export class PropiedadesResiduoEntity extends BaseEntity implements IPropiedadResiduo{

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  valor: number;

  @ManyToOne(() => TiposResiduoPropiedadesEntity, tipo => tipo.propiedad)
  tiposResiduo: TiposResiduoPropiedadesEntity;
}