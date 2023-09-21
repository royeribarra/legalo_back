import { Body, Controller, Get, Param, Post, Put, Res, UseGuards, Query} from '@nestjs/common';
import { VehiculoDTO, VehiculoUpdateDTO } from '../dto/vehiculo.dto';
import { Delete } from '@nestjs/common/decorators';
import { VehiculosService } from '../services/vehiculos.service';
import { TipoVehiculoService } from '../services/tipoVehiculo.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../auth/guards/auth.guard';

@ApiTags('Vehiculos')
@Controller('vehiculos')
//@UseGuards(AuthGuard)
export class VehiculosController {
  constructor(
    private readonly vehiculoService: VehiculosService,
    private readonly tipoVehiculoService: TipoVehiculoService
  ) {}

  @Post('create')
  public async registerVehiculo(@Body() body: VehiculoDTO, @Res() response: Response)
  {
    const tipoVehiculo = await this.tipoVehiculoService.findTipoVehiculoById(body.tipoVehiculoId);

    const existVehiculo = await this.vehiculoService.findVehiculoBy('placa', body.placa);
    
    if(existVehiculo){
      return response.json({
        message: `Ya existe un vehículo con la placa ${body.placa}`,
        state: false
      });
    } 

    const {state,message} = await this.vehiculoService.createVehiculo(body, tipoVehiculo);
    return response.json({
      message: message,
      state: state
    });
  }

  @Get('all')
  public async findAllVehiculos(@Query() queryParams: any)
  {
    console.log("url", queryParams)
    return await this.vehiculoService.findVehiculos(queryParams);
  }

  @Get(':id')
  public async findVehiculoById(@Param('id') id: number){
    return await this.vehiculoService.findVehiculoById(id);
  }

  @Put('edit/:id')
  public async updateVehiculo(@Body() body: VehiculoUpdateDTO, @Param('id') id:string)
  {
    const {message, state } = await this.vehiculoService.updateVehiculo(body, id);

    return {
      message: message,
      state: state
    };
  }

  @Delete(':id')
  public async deleteVehiculo(@Param('id') id:string){
    const { state, message } =await this.vehiculoService.deleteVehiculo(id);
    return {
      state: state,
      message: message,
    }
  }

}
