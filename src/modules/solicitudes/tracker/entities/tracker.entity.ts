import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { EtapaTrackerEntity } from './etapaTracker.entity';
import { AreaEmpresaEntity } from '../../../../modules/mantenimiento/areasEmpresa/entities/areasEmpresa.entity';
import { ITrackerSolicitud } from '../../../../interfaces/solicitudes/tracker.interface';
import { SolicitudesEntity } from '../../solicitudes/entities/solicitudes.entity';

@Entity({name:'tracker'})
export class TrackerEntity extends BaseEntity implements ITrackerSolicitud
{
  @Column()
  etapaActual: number;

  @Column()
  fechaInicio: string;

  @Column()
  fechaCompletado: string;

  @Column()
  descripcion: string;

  @Column()
  estado: string;

  @Column()
  archivo: string;

  @OneToMany(() => EtapaTrackerEntity, etapa => etapa.tracker)
  etapas: EtapaTrackerEntity[];

  @ManyToOne(() => AreaEmpresaEntity, responsable => responsable.trackers)
  responsable: AreaEmpresaEntity;

  @OneToOne(() => SolicitudesEntity)
  @JoinColumn()
  pedido: SolicitudesEntity;
}