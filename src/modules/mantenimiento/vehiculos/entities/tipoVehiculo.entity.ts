import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ITipoVehiculo } from 'src/interfaces/mantenimiento/tipoVehiculo.interface';
import { VehiculosEntity } from './vehiculo.entity';

@Entity({name:'tipos_vehiculo'})
export class TipoVehiculoEntity extends BaseEntity implements ITipoVehiculo{

  @Column()
  nombre: string;

  @Column({nullable: true})
  descripcion: string;

  @OneToMany(() => VehiculosEntity, vehiculo => vehiculo.tipoVehiculo)
  vehiculos: VehiculosEntity[];
}