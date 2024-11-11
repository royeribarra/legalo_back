import { Body, Controller, Get, Param, Post, Put, UseGuards, Query, BadRequestException} from '@nestjs/common';
import { UsuarioDTO, UsuarioUpdateDTO } from './usuario.dto';
import { Delete } from '@nestjs/common/decorators';
import { UsuariosService } from './usuario.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('usuarios')
//@UseGuards(AuthGuard)
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService
    ) {}

  @ApiHeader({
    name: 'copetrol_token'
  })
  @Post('create')
  public async registerUsuario(@Body() body: UsuarioDTO)
  {
    const { state, message, usuario } = await this.usuariosService.createUsuario(body);

    return {
      state: state,
      message: message,
      usuario: usuario
    }
  }

  @ApiHeader({
    name: 'copetrol_token'
  })
  @Get('all')
  public async findAllUsuarios(@Query() queryParams: any)
  {
    return await this.usuariosService.findUsuarios(queryParams);
  }

  @ApiHeader({
    name: 'copetrol_token'
  })
  @Get(':id')
  public async findUsuarioById(@Param('id') id: number){
    return await this.usuariosService.findUsuarioById(id);
  }

  @ApiHeader({
    name: 'copetrol_token'
  })
  @Put('edit/:id')
  public async updateUsuario(@Body() body: UsuarioUpdateDTO, @Param('id') id: number){
    const { usuario, state, message } = await this.usuariosService.updateUsuario(body, id);
    return {
      state: state,
      message: message,
    }
  }

  @ApiHeader({
    name: 'copetrol_token'
  })
  @Delete(':id')
  public async deleteUsuario(@Param('id') id:string){
    const {state, message} =  await this.usuariosService.deleteUsuario(id);
    return {
      state: state,
      message: message
    }
  }

  @Get()
  async activateAccount(@Query('codigo') codigo: string) {
    const user = await this.usuariosService.findUserByActivationCode(codigo);

    if (!user) {
      throw new BadRequestException('Código de activación inválido o expirado');
    }

    // Verifica si el código no ha expirado
    const currentDate = new Date();
    if (user.activationCodeExpires < currentDate) {
      throw new BadRequestException('El código de activación ha expirado');
    }

    // Activa la cuenta del usuario
    await this.usuariosService.activateUser(user.id);
    return { message: 'Cuenta activada correctamente' };
  }
}