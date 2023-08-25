import { BaseEntity } from '../../../../config/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IModuloWeb } from '../../../../interfaces/mantenimiento/modulosWeb.interface';
import { RolesModulosWebEntity } from './rolModulosWeb.entity';

@Entity({name:'modulos_web'})
export class ModulosWebEntity extends BaseEntity implements IModuloWeb{

  @Column({unique: true})
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ nullable: true })
  codigo: string;

  @Column({ nullable: true })
  orden: number;

  @OneToMany(() => RolesModulosWebEntity, rol => rol.modulo)
  roles: RolesModulosWebEntity[];
}