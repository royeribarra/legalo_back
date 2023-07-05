import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { TrackerEntity } from './tracker.entity';
import { IEtapaTracker } from 'src/interfaces/solicitudes/etapaTracker.interface';

@Entity({name:'etapaTracker'})
export class EtapaTrackerEntity extends BaseEntity implements IEtapaTracker{

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  estado: string;

  @Column()
  fechaInicio: string;

  @Column()
  fechaFinalizacion: string;

  @Column()
  responsable: string;

  @ManyToOne(() => TrackerEntity, tracker => tracker.etapas)
  tracker: TrackerEntity;
}