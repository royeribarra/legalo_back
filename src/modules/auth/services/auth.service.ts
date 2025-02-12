import { Injectable } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PayLoadToken } from '../interfaces/auth.interface';
import { UsuariosEntity } from '../../usuario/usuarios.entity';
import { UsuariosService } from '../../usuario/usuario.service';
import { ErrorManager } from '../../../utils/error.manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsuariosService
  ) {

  }
  public async validateUser(usuario: string, contrasena: string){
    try {
      const userByEmail = await this.userService.findBy({
        key: 'correo',
        value: usuario
      });
      if(userByEmail){
        const match = await bcrypt.compare(contrasena, userByEmail.contrasena);
        if(!userByEmail.isActive) return null;
        if (match) return userByEmail;
      }
      return null;
    } catch (error) {
      console.log(error)
      throw ErrorManager.createSignatureError(error.message);
    }
    
  }

  public signJWT({
    payload,
    secret,
    expires
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: jwt.SignOptions["expiresIn"];
  }){
    return jwt.sign(payload, secret, {expiresIn: expires});
  }

  public async generateJWT(user: UsuariosEntity) : Promise<any>{
    const getUser = await this.userService.findUsuarioById(user.id);

    const payload : PayLoadToken= {
      usuarioId: getUser.id.toString(),
      user: getUser
    };
    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '24h'
      }),
      user
    }
  }
}