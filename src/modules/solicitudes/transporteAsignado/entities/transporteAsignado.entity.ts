import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ITransporteAsignado } from 'src/interfaces/solicitudes/transporteAsignado.interface';
import { ConductoresEntity } from '../../../mantenimiento/conductores/entities/conductores.entity';

@Entity({name:'transporte_asignado'})
export class TransporteAsignadoEntity extends BaseEntity implements ITransporteAsignado
{
  @Column()
  horaLlegadaCliente: string;

  @Column()
  horaSalidaCliente: string;

  @Column()
  horaLlegadaPlanta: string;

  @Column()
  horaSalidaPlanta: string;

  @Column()
  observaciones: string;

  @Column()
  cilindros: number;

  @ManyToOne(() => ConductoresEntity)
  @JoinColumn({ name: 'id_conductor_supervisor', referencedColumnName: 'id' })
  conductorSupervisor: ConductoresEntity;

  @ManyToOne(() => ConductoresEntity)
  @JoinColumn({ name: 'id_conductor', referencedColumnName: 'id' })
  conductor: ConductoresEntity;
}