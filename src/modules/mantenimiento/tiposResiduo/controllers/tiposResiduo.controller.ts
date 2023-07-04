import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { TipoResiduoDTO, TipoResiduoUpdateDTO } from '../dto/tipoResiduo.dto';
import { Delete } from '@nestjs/common/decorators';
import { TiposResiduoService } from '../services/tiposResiduo.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('TiposResiduo')
@Controller('tipos-residuo')
export class TiposResiduoController {
  constructor(private readonly herramientasService: TiposResiduoService) {}

  @Post('register')
  public async registerHerramienta(@Body() body:TipoResiduoDTO){
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
  public async updateHerramienta(@Body() body: TipoResiduoUpdateDTO, @Param('id') id:string){
    return await this.herramientasService.updateResiduo(body, id);
  }

  @Delete(':id')
  public async deleteHerramienta(@Param('id') id:string){
    return await this.herramientasService.deleteResiduo(id);
  }

}
