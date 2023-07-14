import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IVehiculo } from 'src/interfaces/mantenimiento/vehiculo.interface';
import { TipoVehiculoEntity } from './tipoVehiculo.entity';

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

  @Column()
  unidadMedida: number;

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
}