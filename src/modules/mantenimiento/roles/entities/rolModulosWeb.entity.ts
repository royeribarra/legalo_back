import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../config/base.entity';
import { RolesEntity } from './roles.entity';
import { ModulosWebEntity } from './modulosWeb.entity';

@Entity({ name: 'roles_modulos_web' })
export class RolesModulosWebEntity extends BaseEntity {

  @ManyToOne(()=> RolesEntity, (rol)=> rol.modulos)
  rol: RolesEntity;

  @ManyToOne(() => ModulosWebEntity, (modulo)=> modulo.roles)
  modulo: ModulosWebEntity;
}