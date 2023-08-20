import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ISucursalCliente } from '../../../../interfaces/solicitudes/sucursalCliente.interface';
import { ClientesEntity } from '../../clientes/entities/clientes.entity';

@Entity({name:'sucursalescliente'})
export class SucursalesClienteEntity extends BaseEntity implements ISucursalCliente{

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column({nullable: true})
  distrito: string;

  @Column({ nullable: true})
  provincia: string;

  @Column()
  contacto: string;

  @Column()
  numeroContacto: string;

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
}