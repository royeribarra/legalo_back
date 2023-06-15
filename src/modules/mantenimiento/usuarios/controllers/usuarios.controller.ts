import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { UsuarioDTO, UsuarioUpdateDTO } from '../dto/usuario.dto';
import { Delete } from '@nestjs/common/decorators';
import { UsuariosService } from '../services/usuarios.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('register')
  public async registerUsuario(@Body() body:UsuarioDTO){
    return await this.usuariosService.createUsuario(body);
  }

  @Get('all')
  public async findAllUsuarios()
  {
    return await this.usuariosService.findUsuarios();
  }

  @Get(':id')
  public async findUsuarioById(@Param('id') id: string){
    return await this.usuariosService.findUsuarioById(id);
  }

  @Put('edit/:id')
  public async updateUsuario(@Body() body: UsuarioUpdateDTO, @Param('id') id:string){
    return await this.usuariosService.updateUsuario(body, id);
  }

  @Delete(':id')
  public async deleteUsuario(@Param('id') id:string){
    return await this.usuariosService.deleteUsuario(id);
  }

}
