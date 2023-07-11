import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IUnidadMedidaResiduo } from 'src/interfaces/mantenimiento/residuos/unidadMedidadResiduo.interface';
import { TiposResiduoEntity } from './tiposResiduo.entity';

@Entity({name:'unidadesMedidaResiduo'})
export class UnidadesMedidaResiduoEntity extends BaseEntity implements IUnidadMedidaResiduo
{
  @Column()
  unidadMedida: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ nullable: true })
  factorConversion: string;

  @OneToMany(() => TiposResiduoEntity, tipo => tipo.residuos)
  tiposResiduo: TiposResiduoEntity;
}