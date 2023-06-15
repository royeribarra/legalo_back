import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { RolDTO, RolUpdateDTO } from '../dto/rol.dto';
import { Delete } from '@nestjs/common/decorators';
import { RolesService } from '../services/roles.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly usuariosService: RolesService) {}

  @Post('register')
  public async registerRol(@Body() body:RolDTO){
    return await this.usuariosService.createRol(body);
  }

  @Get('all')
  public async findAllRoles()
  {
    return await this.usuariosService.findRoles();
  }

  @Get(':id')
  public async findRolById(@Param('id') id: string){
    return await this.usuariosService.findRolById(id);
  }

  @Put('edit/:id')
  public async updateRol(@Body() body: RolUpdateDTO, @Param('id') id:string){
    return await this.usuariosService.updateRol(body, id);
  }

  @Delete(':id')
  public async deleteRol(@Param('id') id:string){
    return await this.usuariosService.deleteRol(id);
  }

}
