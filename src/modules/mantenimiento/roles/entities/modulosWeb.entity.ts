import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IModuloWeb } from 'src/interfaces/mantenimiento/modulosWeb.interface';
import { RolesModulosWebEntity } from './rolModulosWeb.entity';

@Entity({name:'modulosWeb'})
export class ModulosWebEntity extends BaseEntity implements IModuloWeb{

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  codigo: string;

  @Column()
  orden: number;

  @OneToMany(() => RolesModulosWebEntity, rol => rol.modulo)
  roles: RolesModulosWebEntity[];
}