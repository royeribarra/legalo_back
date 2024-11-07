import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { IConductor } from '../../../../interfaces/mantenimiento/conductor.interface';
import { VehiculosEntity } from '../../vehiculos/entities/vehiculo.entity';

@Entity({name:'conductores'})
export class ConductoresEntity extends BaseEntity implements IConductor
{
  @Column()
  tipo: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({unique: true})
  dni: string;

  @Column({nullable: true})
  correo: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  licenciaConducir: string;

  @Column({nullable: true})
  fechaContratacion: string;

  @Column()
  fechaVencimientoLicencia: string;

  @Column()
  disponibilidad: string;

  @Column({default: true})
  isActive: boolean;

  @OneToOne(() => VehiculosEntity, vehiculo => vehiculo.conductor)
  @JoinColumn()
  vehiculo: VehiculosEntity;
}