import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ICliente } from 'src/interfaces/solicitudes/cliente.interface';
import { SucursalesClienteEntity } from '../../sucursalesCliente/entities/sucursalesCliente.entity';

@Entity({name:'clientes'})
export class ClientesEntity extends BaseEntity implements ICliente{

  @Column()
  nombre: string;

  @Column()
  contactoPrincipal: string;

  @Column()
  direccion: string;

  @Column()
  numeroContacto: string;

  @Column()
  codigo: string;

  @Column({nullable: true})
  certificaciones: string;

  @OneToMany(() => SucursalesClienteEntity, sucursal => sucursal.cliente)
  sucursales: SucursalesClienteEntity[];
}