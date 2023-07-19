import { Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { UsuarioDTO, UsuarioUpdateDTO } from '../dto/usuario.dto';
import { Delete } from '@nestjs/common/decorators';
import { UsuariosService } from '../services/usuarios.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../auth/guards/auth.guard';
import { RolesService } from '../../roles/services/roles.service';

@ApiTags('Usuarios')
@Controller('usuarios')
@UseGuards(AuthGuard)
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly rolService: RolesService
    ) {}

  @ApiHeader({
    name: 'copetrol_token'
  })
  @Post('register')
  public async registerUsuario(@Body() body:UsuarioDTO){
    const rol = await this.rolService.findRolById(body.rol_id);
    
    return await this.usuariosService.createUsuario(body, rol);
  }

  @ApiHeader({
    name: 'copetrol_token'
  })
  @Get('all')
  public async findAllUsuarios()
  {
    return await this.usuariosService.findUsuarios();
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
  public async updateUsuario(@Body() body: UsuarioUpdateDTO, @Param('id') id:string){
    const rol = await this.rolService.findRolById(body.rol_id);
    return await this.usuariosService.updateUsuario(body, id, rol);
  }

  @ApiHeader({
    name: 'copetrol_token'
  })
  @Delete(':id')
  public async deleteUsuario(@Param('id') id:string){
    return await this.usuariosService.deleteUsuario(id);
  }
}