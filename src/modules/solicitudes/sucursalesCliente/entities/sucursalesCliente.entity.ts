import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ISucursalCliente } from 'src/interfaces/solicitudes/sucursalCliente.interface';
import { ClientesEntity } from '../../clientes/entities/clientes.entity';

@Entity({name:'sucursalescliente'})
export class SucursalesClienteEntity extends BaseEntity implements ISucursalCliente{

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  distrito: string;

  @Column()
  provincia: string;

  @Column()
  contacto: string;

  @Column()
  numeroContacto: string;

  @Column()
  codigoSucursal: string;

  @Column()
  latitud: string;

  @Column()
  longitud: string;

  @ManyToOne(() => ClientesEntity, cliente => cliente.sucursales)
  cliente: ClientesEntity;
}