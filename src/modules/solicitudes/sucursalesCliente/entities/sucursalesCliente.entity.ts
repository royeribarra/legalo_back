import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ISucursalCliente } from '../../../../interfaces/solicitudes/sucursalCliente.interface';
import { ClientesEntity } from '../../clientes/entities/clientes.entity';
import { SolicitudesEntity } from '../../solicitudes/entities/solicitudes.entity';

@Entity({name:'sucursales_cliente'})
export class SucursalesClienteEntity extends BaseEntity implements ISucursalCliente{

  @Column({ nullable: true})
  nombre: string;

  @Column()
  direccion: string;

  @Column({nullable: true})
  distritoId: number;

  @Column({ nullable: true})
  provinciaId: number;

  @Column()
  contacto: string;

  @Column()
  numeroContacto: string;

  @Column({ nullable: true})
  correoContacto: string;

  @Column()
  codigoSucursal: string;

  @Column({ nullable: true})
  latitud: string;

  @Column({ nullable: true})
  longitud: string;

  @Column({ type: "text", nullable: true})
  observaciones: string;

  @ManyToOne(() => ClientesEntity, cliente => cliente.sucursales)
  cliente: ClientesEntity;

  @OneToMany(() => SolicitudesEntity, solicitud => solicitud.sucursal)
  solicitudes: SolicitudesEntity[];
}