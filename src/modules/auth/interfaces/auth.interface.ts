

import { UsuariosEntity } from "../../../../src/modules/usuario/usuarios.entity";
import { RolesEntity } from "../../mantenimiento/roles/entities/roles.entity";

export interface PayLoadToken{
  usuarioId: string,
  user: UsuariosEntity
}

export interface AuthBody{
  correo: string,
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