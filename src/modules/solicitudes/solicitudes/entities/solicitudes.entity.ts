import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ISolicitudRecoleccion } from 'src/interfaces/solicitudes/solicitudRecoleccion.interface';

@Entity({name:'solicitudes'})
export class SolicitudesEntity extends BaseEntity implements ISolicitudRecoleccion{

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

  @Column()
  direccionRecoleccion: string;

  @Column()
  contactoEmpresa: string;

  @Column()
  estadoSolicitud: number;
}