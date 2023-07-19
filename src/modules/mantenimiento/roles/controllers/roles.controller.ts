import { Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { RolDTO, RolUpdateDTO } from '../dto/rol.dto';
import { Delete } from '@nestjs/common/decorators';
import { RolesService } from '../services/roles.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Roles')
@Controller('roles')

export class RolesController {
  constructor(private readonly rolService: RolesService) {}

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
