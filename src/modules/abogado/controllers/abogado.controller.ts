import { Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { AbogadosService } from '../services/abogados.service';
import { AbogadoDTO } from '../dto/abogado.dto';

@ApiTags('Abogados')
@Controller('abogados')
export class AbogadosController {
  constructor(
    private readonly abogadosService: AbogadosService,
    ) {}

  @Post('create')
  public async registerAbogado(@Body() body: AbogadoDTO){
    // const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);
    const { state, message, abogado } = await this.abogadosService.createAbogado(body);
    return {
      state: state,
      message: message,
      abogado: abogado
    }
  }

  // @Get('all')
  // public async findAllConductores(@Query() queryParams: any)
  // {
  //   return await this.abogadosService.findConductores(queryParams);
  // }

  @Get(':id')
  public async findConductorById(@Param('id') id: number){
    return await this.abogadosService.findAbogadoById(id);
  }

  // @Put('edit/:id')
  // public async updateConductor(@Body() body: ConductorUpdateDTO, @Param('id') id: number){
  //   const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);

  //   const {state, message} = await this.abogadosService.updateConductor(body, id, vehiculo);
  //   return {
  //     state: state,
  //     message: message,
  //   }
  // }

  // @Delete(':id')
  // public async deleteConductor(@Param('id') id:string){
  //   const{ state, message} = await this.abogadosService.deleteConductor(id);
  //   return {
  //     state: state,
  //     message: message
  //   }
  // }

}