import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IVehiculo } from 'src/interfaces/mantenimiento/vehiculo.interface';
import { TipoVehiculoEntity } from './tipoVehiculo.entity';

@Entity({name:'vehiculos'})
export class VehiculosEntity extends BaseEntity implements IVehiculo{

  @Column()
  nombre: string;

  @Column({nullable: true})
  codigo: string;

  @Column()
  placa: string;

  @Column()
  capacidadCarga: number;

  @Column()
  unidadMedida: number;

  @Column()
  certificado: string;

  @Column()
  estadoMantenimiento: string;

  @Column()
  disponibilidad: string;

  @Column()
  responsable: string;

  @Column()
  vencimientoMTC: string;

  @Column()
  vencimientoPoliza: string;

  @Column()
  vencimientoRD: string;

  @Column()
  vencimientoSOAT: string;

  @ManyToOne(() => TipoVehiculoEntity, tipoVehiculo => tipoVehiculo.vehiculos)
  tipoVehiculo: TipoVehiculoEntity;
}