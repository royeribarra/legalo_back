import { RolesEntity } from "src/modules/mantenimiento/roles/entities/roles.entity";

export interface PayLoadToken{
  sub: string,
  rol: RolesEntity
}

export interface AuthBody{
  usuario: string,
  contrasena: string
}