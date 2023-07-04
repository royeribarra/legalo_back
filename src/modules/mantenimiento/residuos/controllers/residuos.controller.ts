import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { ResiduoDTO, ResiduoUpdateDTO } from '../dto/residuo.dto';
import { Delete } from '@nestjs/common/decorators';
import { ResiduosService } from '../services/residuos.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('distritos')
export class ResiduosController {
  constructor(private readonly herramientasService: ResiduosService) {}

  @Post('register')
  public async registerHerramienta(@Body() body:ResiduoDTO){
    return await this.herramientasService.createResiduo(body);
  }

  @Get('all')
  public async findAllHerramientas()
  {
    return await this.herramientasService.findResiduos();
  }

  @Get(':id')
  public async findHerramientaById(@Param('id') id: string){
    return await this.herramientasService.findResiduoById(id);
  }

  @Put('edit/:id')
  public async updateHerramienta(@Body() body: ResiduoUpdateDTO, @Param('id') id:string){
    return await this.herramientasService.updateResiduo(body, id);
  }

  @Delete(':id')
  public async deleteHerramienta(@Param('id') id:string){
    return await this.herramientasService.deleteResiduo(id);
  }

}
