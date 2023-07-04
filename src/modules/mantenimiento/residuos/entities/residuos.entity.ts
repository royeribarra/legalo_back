import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IResiduo } from '../../../../interfaces/mantenimiento/residuos/residuo.interface';
import { TiposResiduoEntity } from '../../tiposResiduo/entities/tiposResiduo.entity';

@Entity({name:'residuos'})
export class ResiduosEntity extends BaseEntity implements IResiduo
{
  @Column()
  descripcion: string;

  @Column()
  nivelPeligro: number;

  @Column()
  cantidadGenerada: number;

  @Column()
  tratamiento: string;

  @Column()
  disposicionFinal: string;

  @Column()
  responsable: string;

  @ManyToOne(() => TiposResiduoEntity, tipo => tipo.residuos)
  tipoResiduo: TiposResiduoEntity;
}