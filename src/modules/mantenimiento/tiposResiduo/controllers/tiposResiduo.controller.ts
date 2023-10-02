import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { TipoResiduoDTO, TipoResiduoUpdateDTO } from '../dto/tipoResiduo.dto';
import { Delete } from '@nestjs/common/decorators';
import { TiposResiduoService } from '../services/tiposResiduo.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Tipos Residuo')
@Controller('tipos-residuo')
export class TiposResiduoController {
  constructor(private readonly tipoResiduoService: TiposResiduoService) {}

  @Post('create')
  public async registerTipoResiduo(@Body() body: TipoResiduoDTO){
    const { state, message } = await this.tipoResiduoService.createResiduo(body);
    return  {
      state,
      message
    }
  }

  @Get('all')
  public async findAllTiposResiduo()
  {
    return await this.tipoResiduoService.findResiduos();
  }

  @Get(':id')
  public async findTipoResiduoById(@Param('id') id: number){
    return await this.tipoResiduoService.findResiduoById(id);
  }

  @Put('edit/:id')
  public async updateTipoResiduo(@Body() body: TipoResiduoUpdateDTO, @Param('id') id: number){
    return await this.tipoResiduoService.updateResiduo(body, id);
  }

  @Delete(':id')
  public async deleteTipoResiduo(@Param('id') id:string){
    return await this.tipoResiduoService.deleteResiduo(id);
  }

}
