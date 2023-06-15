import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity } from 'typeorm';
import { IConductor } from 'src/interfaces/mantenimiento/conductor.interface';

@Entity({name:'conductores'})
export class ConductoresEntity extends BaseEntity implements IConductor{

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  edad: number;

  @Column()
  correo: string;

  @Column()
  usuario: string;

  @Column()
  contrasena: string;

  @Column()
  direccion: string;

  @Column()
  dni: string;

  @Column()
  telefono: string;

  @Column()
  licenciaConducir: string;

  @Column()
  fechaContratacion: string;

  @Column()
  fechaVencimientoLicencia: string;

  @Column()
  isActive: boolean;

  @Column()
  historialAccidentes: [];

  @Column()
  vehiculoAsignado: number;

  @Column()
  disponibilidad: number;
}