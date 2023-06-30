import { Body, Controller, Get, Param, Post, Put, UnauthorizedException} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { AuthBody } from '../interfaces/auth.interface';
import { AuthDTO } from '../dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() {usuario, contrasena}: AuthDTO)
  {
    console.log(usuario, contrasena)
    const userValidate = await this.authService.validateUser(usuario, contrasena);

    if(!userValidate){
      throw new UnauthorizedException('Data no validada.')
    }

    const jwt = await this.authService.generateJWT(userValidate);

    return jwt;
  }
  
}
