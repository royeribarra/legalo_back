import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { TipoResiduoDTO, TipoResiduoUpdateDTO } from '../dto/tipoResiduo.dto';
import { Delete } from '@nestjs/common/decorators';
import { TiposResiduoService } from '../services/tiposResiduo.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UnidadMedidaResiduoService } from '../services/unidadesMedidaResiduo.service';

@ApiTags('UnidadesMedida')
@Controller('unidades-medida')
export class UnidadMedidaResiduoController {
  constructor(private readonly unidadesService: UnidadMedidaResiduoService) {}

  // @Post('register')
  // public async registerUnidadMedida(@Body() body:TipoResiduoDTO){
  //   return await this.unidadesService.createResiduo(body);
  // }

  @Get('all')
  public async findAllUnidadesMedida()
  {
    return await this.unidadesService.findUnidades();
  }

  // @Get(':id')
  // public async findUnidadMedidaById(@Param('id') id: string){
  //   return await this.unidadesService.findResiduoById(id);
  // }

  // @Put('edit/:id')
  // public async updateUnidadMedida(@Body() body: TipoResiduoUpdateDTO, @Param('id') id:string){
  //   return await this.unidadesService.updateResiduo(body, id);
  // }

  // @Delete(':id')
  // public async deleteUnidadMedida(@Param('id') id:string){
  //   return await this.unidadesService.deleteResiduo(id);
  // }

}