import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { ICliente } from 'src/interfaces/solicitudes/cliente.interface';
import { SucursalesClienteEntity } from '../../sucursalesCliente/entities/sucursalesCliente.entity';

@Entity({name:'clientes'})
@Unique(['ruc', 'nombre'])
export class ClientesEntity extends BaseEntity implements ICliente{

  @Column()
  ruc: string;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column({nullable: true})
  distrito: string;

  @Column({nullable: true})
  provincia: string;

  @Column({nullable: true})
  contactoPrincipal: string;

  @Column({nullable: true})
  numeroContacto: string;

  @Column({nullable: true})
  codigo: string;

  @Column({nullable: true})
  certificaciones: string;

  @OneToMany(() => SucursalesClienteEntity, sucursal => sucursal.cliente)
  sucursales: SucursalesClienteEntity[];
}