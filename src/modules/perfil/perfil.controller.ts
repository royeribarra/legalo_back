import { Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { RolDTO, RolUpdateDTO } from './perfil.dto';
import { Delete } from '@nestjs/common/decorators';
import { PerfilesService } from './perfiles.services';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Perfiles')
@Controller('perfiles')

export class PerfilesController {
  constructor(private readonly rolService: PerfilesService) {}

  @Post('register')
  public async registerRol(@Body() body:RolDTO){
    return await this.rolService.createRol(body);
  }

  @Get('all')
  public async findAllRoles()
  {
    return await this.rolService.findRoles();
  }

  @Get(':id')
  public async findRolById(@Param('id') id: number){
    return await this.rolService.findRolById(id);
  }

  @Put('edit/:id')
  public async updateRol(@Body() body: RolUpdateDTO, @Param('id') id:string){
    return await this.rolService.updateRol(body, id);
  }

  @Delete(':id')
  public async deleteRol(@Param('id') id:string){
    return await this.rolService.deleteRol(id);
  }

}
