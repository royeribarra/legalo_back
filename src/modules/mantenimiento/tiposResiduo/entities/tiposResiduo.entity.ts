import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ITipoResiduo } from '../../../../interfaces/mantenimiento/residuos/tipoResiduo.interface';
import { TiposResiduoMedidasSeguridadEntity } from './tipoResiduoMedidaSeguridad.entity';
import { TiposResiduoMetodosTratamientoEntity } from './tipoResiduoMetodoTratamiento.entity';
import { TiposResiduoNormativasEntity } from './tipoResiduoNormativa.entity';
import { TiposResiduoPropiedadesEntity } from './tipoResiduoPropiedad.entity';
import { ResiduosEntity } from '../../residuos/entities/residuos.entity';

@Entity({name:'tiposResiduo'})
export class TiposResiduoEntity extends BaseEntity implements ITipoResiduo
{
  @Column()
  codigo: string;

  @Column()
  nombre: string;

  @Column()
  nivelPeligro: number;

  @Column({nullable: true})
  metodoAlmacenamiento: number;

  @Column({nullable: true})
  disposicionFinal: string;

  @Column({nullable: true})
  responsable: string;

  @OneToMany(() => ResiduosEntity, residuo => residuo.tipoResiduo)
  residuos: ResiduosEntity[];

  @ManyToOne(() => TiposResiduoMedidasSeguridadEntity, medida => medida.tipoResiduo)
  medidasSeguridad: TiposResiduoMedidasSeguridadEntity;

  @ManyToOne(() => TiposResiduoMetodosTratamientoEntity, metodo => metodo.tipoResiduo)
  metodosTratamiento: TiposResiduoMetodosTratamientoEntity;

  @ManyToOne(() => TiposResiduoNormativasEntity, normativa => normativa.tipoResiduo)
  normativas: TiposResiduoNormativasEntity;

  @ManyToOne(() => TiposResiduoPropiedadesEntity, propiedad => propiedad.tipoResiduo)
  propiedades: TiposResiduoPropiedadesEntity;
}