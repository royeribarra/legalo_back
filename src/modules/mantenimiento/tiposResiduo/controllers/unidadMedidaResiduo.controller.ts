import { Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import { TipoResiduoDTO, TipoResiduoUpdateDTO } from '../dto/tipoResiduo.dto';
import { Delete } from '@nestjs/common/decorators';
import { TiposResiduoService } from '../services/tiposResiduo.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UnidadMedidaResiduoService } from '../services/unidadesMedidaResiduo.service';

@ApiTags('Unidades Medida')
@Controller('unidades-medida')
export class UnidadMedidaResiduoController {
  constructor(private readonly unidadesService: UnidadMedidaResiduoService) {}

  @Get('all')
  public async findAllUnidadesMedida(@Query() queryParams: any)
  {
    return await this.unidadesService.findUnidades(queryParams);
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
