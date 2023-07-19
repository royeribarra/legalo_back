import { RolesEntity } from "src/modules/mantenimiento/roles/entities/roles.entity";

export interface PayLoadToken{
  usuarioId: string,
  rol: RolesEntity
}

export interface AuthBody{
  usuario: string,
  contrasena: string
}

export interface AuthTokenResult{
  usuarioId: number,
  role: RolesEntity,
  iat: number,
  exp: number
}

export interface IUseToken{
  usuarioId: number,
  role: RolesEntity,
  isExpired: boolean
}