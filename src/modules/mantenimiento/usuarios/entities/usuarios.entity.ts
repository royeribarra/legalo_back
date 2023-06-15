import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity } from 'typeorm';
import { IUsuario } from 'src/interfaces/mantenimiento/user.interface';

@Entity({name:'conductores'})
export class UsuariosEntity extends BaseEntity implements IUsuario{

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  edad: number;

  @Column()
  correo: string;

  @Column()
  usuario: string;

  @Column()
  contrasena: string;

  @Column()
  direccion: string;

  @Column()
  dni: string;

  @Column()
  telefono: string;

  @Column()
  distrito: string;

  @Column()
  provincia: string;
}