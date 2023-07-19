import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { VehiculoDTO, VehiculoUpdateDTO } from '../dto/vehiculo.dto';
import { Delete } from '@nestjs/common/decorators';
import { VehiculosService } from '../services/vehiculos.service';
import { TipoVehiculoService } from '../services/tipoVehiculo.service';
import { TipoVehiculoDTO, TipoVehiculoUpdateDTO } from '../dto/tipoVehiculo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tipos Vehiculo')
@Controller('tipos-vehiculo')
export class TipoVehiculoController {
  constructor(
    private readonly tipoVehiculoService: TipoVehiculoService
  ) {}

  @Post('create')
  public async registerTipoVehiculo(@Body() body: TipoVehiculoDTO)
  {
    return await this.tipoVehiculoService.createTipoVehiculo(body);
  }

  @Get('all')
  public async findAllTiposVehiculo()
  {
    return await this.tipoVehiculoService.findTiposVehiculo();
  }

  @Get(':id')
  public async findHerramientaById(@Param('id') id: number){
    return await this.tipoVehiculoService.findTipoVehiculoById(id);
  }

  @Put('edit/:id')
  public async updateHerramienta(@Body() body: TipoVehiculoUpdateDTO, @Param('id') id:string){
    return await this.tipoVehiculoService.updateTipoVehiculo(body, id);
  }

  @Delete(':id')
  public async deleteHerramienta(@Param('id') id:string){
    return await this.tipoVehiculoService.deleteTipoVehiculo(id);
  }

}
