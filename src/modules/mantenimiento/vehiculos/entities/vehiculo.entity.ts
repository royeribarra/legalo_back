import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, JoinTable, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { IVehiculo } from '../../../../interfaces/mantenimiento/vehiculo.interface';
import { TipoVehiculoEntity } from './tipoVehiculo.entity';
import { ConductoresEntity } from '../../conductores/entities/conductores.entity';
import { TransporteAsignadoEntity } from '../../../solicitudes/transporteAsignado/entities/transporteAsignado.entity';
import { VehiculoUnidadMedidaEntity } from './vehiculoUnidadMedida.entity';

@Entity({name:'vehiculos'})
export class VehiculosEntity extends BaseEntity implements IVehiculo{

  @Column({nullable: true})
  nombre: string;

  @Column({nullable: true})
  codigo: string;

  @Column({unique: true})
  placa: string;

  @Column()
  capacidadCarga: number;

  @Column({nullable: true})
  capacidadUsada: number;

  @Column()
  unidadMedida: string;

  @Column({default: false})
  succionador: boolean;

  @Column({nullable: true})
  certificado: string;

  @Column()
  estadoMantenimiento: string;

  @Column()
  disponibilidad: string;

  @Column()
  responsable: string;

  @Column({nullable: true})
  vencimientoMTC: string;

  @Column({nullable: true})
  vencimientoPoliza: string;

  @Column({nullable: true})
  vencimientoRD: string;

  @Column({nullable: true})
  vencimientoSOAT: string;

  @ManyToOne(() => TipoVehiculoEntity, tipoVehiculo => tipoVehiculo.vehiculos)
  tipoVehiculo: TipoVehiculoEntity;

  @OneToOne(() => ConductoresEntity, conductor => conductor.vehiculo)
  conductor: ConductoresEntity;

  @OneToMany(() => TransporteAsignadoEntity, transporte => transporte.vehiculo)
  asignaciones: TransporteAsignadoEntity[];

  @OneToMany(() => VehiculoUnidadMedidaEntity, unidad => unidad.vehiculo)
  @JoinTable()
  unidadesMedida: VehiculoUnidadMedidaEntity;
}