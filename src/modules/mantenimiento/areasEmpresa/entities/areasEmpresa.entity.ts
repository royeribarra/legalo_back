import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { TrackerEntity } from '../../../solicitudes/tracker/entities/tracker.entity';
import { IAreaEmpresa } from 'src/interfaces/mantenimiento/areasEmpresa.interface';

@Entity({name:'areasEmpresa'})
export class AreaEmpresaEntity extends BaseEntity implements IAreaEmpresa{

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  responsable: string;

  @OneToMany(() => TrackerEntity, tracker => tracker.responsable)
  trackers: TrackerEntity[];
}