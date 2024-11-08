import { Body, Controller, Get, Param, Post, Put, UseGuards, Query} from '@nestjs/common';
import { UsuarioDTO, UsuarioUpdateDTO } from '../dto/usuario.dto';
import { Delete } from '@nestjs/common/decorators';
import { UsuariosService } from '../services/usuarios.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../auth/guards/auth.guard';
import { RolesService } from '../../roles/services/roles.service';

@ApiTags('Usuarios')
@Controller('usuarios')
//@UseGuards(AuthGuard)
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly rolService: RolesService
    ) {}

  @ApiHeader({
    name: 'copetrol_token'
  })
  @Post('create')
  public async registerUsuario(@Body() body: UsuarioDTO)
  {
    const rol = await this.rolService.findRolById(body.rolId);
    const { state, message, usuario } = await this.usuariosService.createUsuario(body, rol);

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
    const rol = await this.rolService.findRolById(body.rolId);
    const { usuario, state, message } = await this.usuariosService.updateUsuario(body, id, rol);
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
}