import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { DistritoDTO, DistritoUpdateDTO } from '../dto/distrito.dto';
import { Delete } from '@nestjs/common/decorators';
import { DistritosService } from '../services/distritos.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('distritos')
export class DistritosController {
  constructor(private readonly herramientasService: DistritosService) {}

  @Post('register')
  public async registerHerramienta(@Body() body:DistritoDTO){
    return await this.herramientasService.createHerramienta(body);
  }

  @Get('all')
  public async findAllHerramientas()
  {
    return await this.herramientasService.findHerramientas();
  }

  @Get(':id')
  public async findHerramientaById(@Param('id') id: string){
    return await this.herramientasService.findHerramientaById(id);
  }

  @Put('edit/:id')
  public async updateHerramienta(@Body() body: DistritoUpdateDTO, @Param('id') id:string){
    return await this.herramientasService.updateHerramienta(body, id);
  }

  @Delete(':id')
  public async deleteHerramienta(@Param('id') id:string){
    return await this.herramientasService.deleteHerramienta(id);
  }

}
