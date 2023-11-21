import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ITransporteAsignado } from 'src/interfaces/solicitudes/transporteAsignado.interface';
import { ConductoresEntity } from '../../../mantenimiento/conductores/entities/conductores.entity';
import { VehiculosEntity } from '../../../mantenimiento/vehiculos/entities/vehiculo.entity';
import { SolicitudesEntity } from '../../solicitudes/entities/solicitudes.entity';

@Entity({name:'transporte_asignado'})
export class TransporteAsignadoEntity extends BaseEntity implements ITransporteAsignado
{
  @Column()
  fechaRecoleccion: string;

  @Column({nullable: true})
  horaLlegadaCliente: string;

  @Column({nullable: true})
  horaSalidaCliente: string;

  @Column({nullable: true})
  horaLlegadaPlanta: string;

  @Column({nullable: true})
  horaSalidaPlanta: string;

  @Column({nullable: true})
  observaciones: string;

  @Column({nullable: true})
  cilindros: number;

  @Column({nullable: true})
  cantidadTotalUsada: number;

  @ManyToOne(() => ConductoresEntity)
  @JoinColumn({ name: 'id_conductor_supervisor', referencedColumnName: 'id' })
  conductorSupervisor: ConductoresEntity;

  @ManyToOne(() => ConductoresEntity)
  @JoinColumn({ name: 'id_conductor', referencedColumnName: 'id' })
  conductor: ConductoresEntity;

  @ManyToOne(() => VehiculosEntity, vehiculo => vehiculo.asignaciones)
  @JoinColumn()
  vehiculo: VehiculosEntity;

  @OneToOne(() => SolicitudesEntity)
  @JoinColumn()
  solicitud: SolicitudesEntity;
}