import { Body, Controller, Get, Param, Post, Put, Res} from '@nestjs/common';
import { VehiculoDTO, VehiculoUpdateDTO } from '../dto/vehiculo.dto';
import { Delete } from '@nestjs/common/decorators';
import { VehiculosService } from '../services/vehiculos.service';
import { TipoVehiculoService } from '../services/tipoVehiculo.service';
import { Response } from 'express';

@Controller('vehiculos')
export class VehiculosController {
  constructor(
    private readonly vehiculoService: VehiculosService,
    private readonly tipoVehiculoService: TipoVehiculoService
  ) {}

  @Post('create')
  public async registerHerramienta(@Body() body: VehiculoDTO, @Res() response: Response)
  {
    const tipoVehiculo = await this.tipoVehiculoService.findTipoVehiculoById(body.tipoVehiculo);

    const existVehiculo = await this.vehiculoService.findVehiculoBy('placa', body.placa);
    console.log(existVehiculo)
    if(existVehiculo){
      return response.json({
        message: `Ya existe un vehículo con la placa ${body.placa}`,
        state: false
      });
    } 

    const newVehiculo = await this.vehiculoService.createVehiculo(body, tipoVehiculo);

    if(newVehiculo){
      return response.json({
        message: 'Vehículo creado correctamente.',
        state: true
      });
    } 

    return response.json({
      message: 'Error al crear vehículo.',
      state: false
    });
  }

  @Get('all')
  public async findAllHerramientas()
  {
    return await this.vehiculoService.findVehiculos();
  }

  @Get(':id')
  public async findHerramientaById(@Param('id') id: string){
    return await this.vehiculoService.findVehiculoById(id);
  }

  @Put('edit/:id')
  public async updateHerramienta(@Body() body: VehiculoUpdateDTO, @Param('id') id:string){
    return await this.vehiculoService.updateVehiculo(body, id);
  }

  @Delete(':id')
  public async deleteHerramienta(@Param('id') id:string){
    return await this.vehiculoService.deleteVehiculo(id);
  }

}
