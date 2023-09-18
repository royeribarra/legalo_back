import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ISolicitudRecoleccion } from '../../../../interfaces/solicitudes/solicitudRecoleccion.interface';
import { TrackerEntity } from '../../tracker/entities/tracker.entity';
import { ResiduosRecojoEntity } from '../../residuosRecojo/entities/residuosRecojo.entity';
import { ClientesEntity } from '../../clientes/entities/clientes.entity';
import { SucursalesClienteEntity } from '../../sucursalesCliente/entities/sucursalesCliente.entity';
import { TransporteAsignadoEntity } from '../../transporteAsignado/entities/transporteAsignado.entity';

@Entity({name:'solicitudes'})
export class SolicitudesEntity extends BaseEntity implements ISolicitudRecoleccion
{
  @Column()
  fechaRecoleccion: string;

  @Column()
  fechaSolicitud: string;

  @Column({nullable: true})
  cilindros: number;

  @Column()
  direccionRecoleccion: string;

  @Column()
  contactoEmpresa: string;

  @Column({ default: 1})
  estadoSolicitud: number;

  @Column({nullable: true})
  observacion: string;

  @ManyToOne(() => ClientesEntity, cliente => cliente.solicitudes)
  cliente: ClientesEntity;

  @ManyToOne(() => SucursalesClienteEntity, sucursal => sucursal.solicitudes)
  sucursal: SucursalesClienteEntity;

  @OneToOne(() => TrackerEntity)
  @JoinColumn()
  tracker: TrackerEntity;

  @OneToOne(() => TransporteAsignadoEntity)
  @JoinColumn()
  asignacionTransporte: TransporteAsignadoEntity;

  @OneToMany(() => ResiduosRecojoEntity, residuo => residuo.solicitud)
  residuosRecojo: ResiduosRecojoEntity[];
}