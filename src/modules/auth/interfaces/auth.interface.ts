

import { UsuariosEntity } from "../../../../src/modules/usuario/usuarios.entity";

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
  iat: number,
  exp: number
}

export interface IUseToken{
  usuarioId: number,
  isExpired: boolean
}