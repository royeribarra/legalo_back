import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { ICliente } from '../../../../interfaces/solicitudes/cliente.interface';
import { SucursalesClienteEntity } from '../../sucursalesCliente/entities/sucursalesCliente.entity';
import { SolicitudesEntity } from '../../solicitudes/entities/solicitudes.entity';

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
  distritoId: number;

  @Column({nullable: true})
  provinciaId: number;

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

  @OneToMany(() => SolicitudesEntity, solicitud => solicitud.cliente)
  solicitudes: SolicitudesEntity[];
}