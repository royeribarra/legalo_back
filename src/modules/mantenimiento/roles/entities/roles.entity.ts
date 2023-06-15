import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IRol } from 'src/interfaces/mantenimiento/rol.interface';
import { UsuariosEntity } from '../../usuarios/entities/usuarios.entity';

@Entity({name:'roles'})
export class RolesEntity extends BaseEntity implements IRol{

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  permisos: [];

  @Column()
  modulosAcceso: [];

  @OneToMany(() => UsuariosEntity, usuario => usuario.rol)
  usuarios: UsuariosEntity[];
}