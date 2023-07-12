import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { VehiculoDTO, VehiculoUpdateDTO } from '../dto/vehiculo.dto';
import { Delete } from '@nestjs/common/decorators';
import { VehiculosService } from '../services/vehiculos.service';

@Controller('vehiculos')
export class VehiculosController {
  constructor(private readonly herramientasService: VehiculosService) {}

  @Post('create')
  public async registerHerramienta(@Body() body:VehiculoDTO){
    return await this.herramientasService.createVehiculo(body);
  }

  @Get('all')
  public async findAllHerramientas()
  {
    return await this.herramientasService.findVehiculos();
  }

  @Get(':id')
  public async findHerramientaById(@Param('id') id: string){
    return await this.herramientasService.findVehiculoById(id);
  }

  @Put('edit/:id')
  public async updateHerramienta(@Body() body: VehiculoUpdateDTO, @Param('id') id:string){
    return await this.herramientasService.updateVehiculo(body, id);
  }

  @Delete(':id')
  public async deleteHerramienta(@Param('id') id:string){
    return await this.herramientasService.deleteVehiculo(id);
  }

}
