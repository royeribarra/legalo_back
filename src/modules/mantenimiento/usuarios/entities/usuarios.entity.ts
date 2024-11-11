import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IUsuario } from '../../../../interfaces/mantenimiento/user.interface';
import { RolesEntity } from '../../roles/entities/roles.entity';
import { Exclude } from '@nestjs/class-transformer';

@Entity({name:'usuarios_past'})
export class UsuariosPasadoEntity extends BaseEntity implements IUsuario{

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  correo: string;

  @Column({ unique: true })
  usuario: string;

  @Exclude()
  @Column({ select: false })
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