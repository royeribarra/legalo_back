import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service'
import { AuthDTO } from '../dto/auth.dto';
import { Response } from 'express';
import { ClientesService } from '../../solicitudes/clientes/services/clientes.service';
import { SucursalesClienteService } from '../../solicitudes/sucursalesCliente/services/sucursalesCliente.service';

@ApiTags('auth')
@Controller('auth')

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly clienteService: ClientesService,
    private readonly sucursalClienteService: SucursalesClienteService,
    )
  {}

  @Post('login')
  public async login(@Body() {correo, contrasena}: AuthDTO, @Res() response: Response)
  {
    const userValidate = await this.authService.validateUser(correo, contrasena);

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

  @Post('login-cliente')
  public async loginCliente(@Body() body)
  {
    const existeCliente = await this.clienteService.findBy({
      key: 'codigo',
      value: body.codigo
    })
    const existeSucursalCliente = await this.sucursalClienteService.findBy({
      key: 'codigoSucursal',
      value: body.codigo
    })
    if (existeCliente) {
      return {
        message: 'Cliente existente.',
        state: true,
        info: {...existeCliente, rol: 1}
      };
    } else if(existeSucursalCliente){
      return {
        message: 'Sucursal de cliente existente.',
        state: true,
        info: {...existeSucursalCliente, rol: 2}
      };
    } 

    return {
      message: 'No existe ningún cliente con el código ingresado.',
      state: false
    };
  }
}
