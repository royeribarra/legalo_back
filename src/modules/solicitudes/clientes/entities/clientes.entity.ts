import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity } from 'typeorm';
import { ICliente } from 'src/interfaces/solicitudes/cliente.interface';

@Entity({name:'clientes'})
export class ClientesEntity extends BaseEntity implements ICliente{

  @Column()
  nombre: string;

  @Column()
  contactoPrincipal: string;

  @Column()
  direccion: string;

  @Column()
  certificaciones: string;
}