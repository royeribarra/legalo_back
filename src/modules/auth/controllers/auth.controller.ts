import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service'
import { AuthDTO } from '../dto/auth.dto';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() {usuario, contrasena}: AuthDTO, @Res() response: Response)
  {
    const userValidate = await this.authService.validateUser(usuario, contrasena);

    if(!userValidate){
      //throw new UnauthorizedException('Data no validada.')
      //return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Credenciales inválidas' });
      return response.json({
        status: 401,
        message: 'Credenciales inválidas.' 
      });
    }

    const jwt = await this.authService.generateJWT(userValidate);
    return response.json({
      status: 200,
      state: true,
      message: 'Inicio de sesión exitoso.',
      jwt: jwt
    });
  }
}
