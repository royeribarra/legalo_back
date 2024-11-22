
import { Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { IPerfil } from '../../interfaces/Perfil.interface';
import { UsuariosEntity } from '../usuario/usuarios.entity';
import { BaseEntity } from '../../config/base.entity';

@Entity({name:'perfiles'})
export class PerfilesEntity extends BaseEntity implements IPerfil{

  @Column({unique: true})
  nombre: string;

  @Column()
  descripcion: string;
}