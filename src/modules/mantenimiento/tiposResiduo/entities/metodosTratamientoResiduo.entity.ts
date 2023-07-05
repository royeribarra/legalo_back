import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IPropiedadResiduo } from '../../../../interfaces/mantenimiento/residuos/propiedadResiduo.interface';
import { TiposResiduoMetodosTratamientoEntity } from './tipoResiduoMetodoTratamiento.entity';

@Entity({name:'metodosTratamientoResiduo'})
export class MetodosTratamientoResiduoEntity extends BaseEntity implements IPropiedadResiduo
{
  @Column()
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column()
  valor: number;

  @ManyToOne(() => TiposResiduoMetodosTratamientoEntity, tipo => tipo.metodoTratamiento)
  tiposResiduo: TiposResiduoMetodosTratamientoEntity;
}