import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { ConductorDTO, ConductorUpdateDTO } from '../dto/conductor.dto';
import { Delete } from '@nestjs/common/decorators';
import { ConductoresService } from '../services/conductores.service';
import { ApiTags } from '@nestjs/swagger';
import { VehiculosService } from '../../vehiculos/services/vehiculos.service';

@ApiTags('Conductores')
@Controller('conductores')
export class ConductoresController {
  constructor(
    private readonly conductoresService: ConductoresService,
    private readonly vehiculoService: VehiculosService
    ) {}

  @Post('register')
  public async registerConductor(@Body() body:ConductorDTO){
    const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);
    return await this.conductoresService.createConductor(body, vehiculo);
  }

  @Get('all')
  public async findAllConductores()
  {
    return await this.conductoresService.findConductores();
  }

  @Get(':id')
  public async findConductorById(@Param('id') id: string){
    return await this.conductoresService.findConductorById(id);
  }

  @Put('edit/:id')
  public async updateConductor(@Body() body: ConductorUpdateDTO, @Param('id') id: number){
    const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);
    return await this.conductoresService.updateConductor(body, id, vehiculo);
  }

  @Delete(':id')
  public async deleteConductor(@Param('id') id:string){
    return await this.conductoresService.deleteConductor(id);
  }

}
