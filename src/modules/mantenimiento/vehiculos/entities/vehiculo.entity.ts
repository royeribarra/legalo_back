import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IUsuario } from 'src/interfaces/mantenimiento/user.interface';
import { RolesEntity } from '../../roles/entities/roles.entity';

@Entity({name:'vehiculos'})
export class VehiculosEntity extends BaseEntity implements IUsuario{

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

  @ManyToOne(() => RolesEntity, rol => rol.usuarios)
  rol: RolesEntity;
}