import { Injectable } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { UsuariosService } from 'src/modules/mantenimiento/usuarios/services/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsuariosService
  ) {

  }

  async login(username: string, password: string): Promise<string> {
    // Lógica de verificación de credenciales

    // Generar el token JWT
    const payload = { username: username };
    const token = this.jwtService.generateToken(payload);

    return token;
  }
}