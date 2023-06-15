import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IUsuario } from 'src/interfaces/mantenimiento/user.interface';
import { ISucursalCliente } from 'src/interfaces/solicitudes/sucursalCliente.interface';

@Entity({name:'sucursalesCliente'})
export class SucursalesClienteEntity extends BaseEntity implements ISucursalCliente{

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  contacto: string;
}