import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IUsuario } from 'src/interfaces/mantenimiento/user.interface';
import { RolesEntity } from '../../roles/entities/roles.entity';
import { Exclude } from '@nestjs/class-transformer';

@Entity({name:'usuarios'})
export class UsuariosEntity extends BaseEntity implements IUsuario{

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ nullable: true })
  edad: number;

  @Column({ unique: true })
  correo: string;

  @Column({ unique: true })
  usuario: string;

  @Exclude()
  @Column()
  contrasena: string;

  @Column()
  direccion: string;

  @Column({ unique: true })
  dni: string;

  @Column()
  telefono: string;

  @Column({ nullable: true })
  distrito: string;

  @Column({ nullable: true })
  provincia: string;

  @ManyToOne(() => RolesEntity, rol => rol.usuarios)
  rol: RolesEntity;
}