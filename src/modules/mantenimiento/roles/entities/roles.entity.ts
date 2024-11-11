import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { IRol } from '../../../../interfaces/mantenimiento/rol.interface';
import { UsuariosPasadoEntity } from '../../usuarios/entities/usuarios.entity';
import { RolesModulosWebEntity } from './rolModulosWeb.entity';

@Entity({name:'roles'})
export class RolesEntity extends BaseEntity implements IRol{

  @Column({unique: true})
  nombre: string;

  @Column()
  descripcion: string;

  @OneToMany(() => UsuariosPasadoEntity, usuario => usuario.rol)
  usuarios: UsuariosPasadoEntity[];

  @OneToMany(() => RolesModulosWebEntity, modulo => modulo.rol)
  @JoinTable()
  modulos: RolesModulosWebEntity[];
}