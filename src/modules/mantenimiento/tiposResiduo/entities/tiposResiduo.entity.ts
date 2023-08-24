import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { ITipoResiduo } from '../../../../interfaces/mantenimiento/residuos/tipoResiduo.interface';
import { TiposResiduoMedidasSeguridadEntity } from './tipoResiduoMedidaSeguridad.entity';
import { TiposResiduoMetodosTratamientoEntity } from './tipoResiduoMetodoTratamiento.entity';
import { TiposResiduoNormativasEntity } from './tipoResiduoNormativa.entity';
import { TiposResiduoPropiedadesEntity } from './tipoResiduoPropiedad.entity';
import { ResiduosEntity } from '../../residuos/entities/residuos.entity';
import { TiposResiduoUnidadMedidaEntity } from './tiposResiduoUnidadMedida.entity';

@Entity({name:'tiposResiduo'})
export class TiposResiduoEntity extends BaseEntity implements ITipoResiduo
{
  @Column({ unique: true })
  codigo: string;

  @Column({ unique: true })
  nombre: string;

  @Column()
  tipo: number;

  @Column({ nullable: true })
  nivelPeligro: string;

  @Column({ nullable: true})
  metodoAlmacenamiento: number;

  @Column({ nullable: true})
  disposicionFinal: string;

  @Column({ nullable: true})
  responsable: string;

  @OneToMany(() => ResiduosEntity, residuo => residuo.tipoResiduo)
  @JoinTable()
  residuos: ResiduosEntity[];

  @OneToMany(() => TiposResiduoMedidasSeguridadEntity, medida => medida.tipoResiduo)
  @JoinTable()
  medidasSeguridad: TiposResiduoMedidasSeguridadEntity;

  @OneToMany(() => TiposResiduoMetodosTratamientoEntity, metodo => metodo.tipoResiduo)
  @JoinTable()
  metodosTratamiento: TiposResiduoMetodosTratamientoEntity;

  @OneToMany(() => TiposResiduoNormativasEntity, normativa => normativa.tipoResiduo)
  @JoinTable()
  normativas: TiposResiduoNormativasEntity;

  @OneToMany(() => TiposResiduoPropiedadesEntity, propiedad => propiedad.tipoResiduo)
  @JoinTable()
  propiedades: TiposResiduoPropiedadesEntity;

  @OneToMany(() => TiposResiduoUnidadMedidaEntity, unidad => unidad.tipoResiduo)
  @JoinTable()
  unidadesMedida: TiposResiduoUnidadMedidaEntity;
}