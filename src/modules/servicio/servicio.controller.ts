import { Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServicioService } from './servicio.service';

@ApiTags('Servicios')
@Controller('servicios')
export class ServicioController {
  constructor(
    private readonly servicioService: ServicioService,
    ) {}

  @Get('all')
  public async findAllServicios(@Query() queryParams: any)
  {
    return await this.servicioService.findServicios(queryParams);
  }

  @Get(':id')
  public async findClienteById(@Param('id') id: number){
    return await this.servicioService.findServicioById(id);
  }

  @Post('estadistica')
  public async getEstadistica(){
    const {serviciosAbogados, serviciosOfertas, serviciosEstadisticas} = await this.servicioService.getEstadisticas();
    return{
      state: true,
      data: {
        serviciosAbogados,
        serviciosOfertas,
        serviciosEstadisticas
      }
    }
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