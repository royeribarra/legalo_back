import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ISolicitudRecoleccion } from 'src/interfaces/solicitudes/solicitudRecoleccion.interface';
import { TrackerEntity } from '../../tracker/entities/tracker.entity';

@Entity({name:'solicitudes'})
export class SolicitudesEntity extends BaseEntity implements ISolicitudRecoleccion
{
  @Column()
  codigo: number;

  @Column()
  fechaRecoleccion: string;

  @Column()
  fechaSolicitud: string;

  @Column()
  empresaSolicitante: number;

  @Column()
  sucursalEmpresaSolicitante: number;

  @Column()
  tipoResiduo: number;

  @Column()
  cantidad: number;

  @Column({nullable: true})
  cilindros: number;

  @Column()
  direccionRecoleccion: string;

  @Column()
  contactoEmpresa: string;

  @Column()
  estadoSolicitud: number;

  @Column({nullable: true})
  observacion: string;

  @OneToOne(() => TrackerEntity)
  @JoinColumn()
  tracker: TrackerEntity;
}