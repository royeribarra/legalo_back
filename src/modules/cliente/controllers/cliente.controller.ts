import { Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import { ConductorDTO, ConductorUpdateDTO } from '../dto/conductor.dto';
import { Delete } from '@nestjs/common/decorators';
import { ConductoresService } from '../services/conductores.service';
import { ApiTags } from '@nestjs/swagger';
import { VehiculosService } from '../../vehiculos/services/vehiculos.service';

@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly conductoresService: ConductoresService,
    private readonly vehiculoService: VehiculosService
    ) {}

  @Post('create')
  public async registerConductor(@Body() body:ConductorDTO){
    const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);
    const { state, message, conductor } = await this.conductoresService.createConductor(body, vehiculo);
    return {
      state: state,
      message: message,
      conductor: conductor
    }
  }

  @Get('all')
  public async findAllConductores(@Query() queryParams: any)
  {
    return await this.conductoresService.findConductores(queryParams);
  }

  @Get(':id')
  public async findConductorById(@Param('id') id: number){
    return await this.conductoresService.findConductorById(id);
  }

  @Put('edit/:id')
  public async updateConductor(@Body() body: ConductorUpdateDTO, @Param('id') id: number){
    const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);

    const {state, message} = await this.conductoresService.updateConductor(body, id, vehiculo);
    return {
      state: state,
      message: message,
    }
  }

  @Delete(':id')
  public async deleteConductor(@Param('id') id:string){
    const{ state, message} = await this.conductoresService.deleteConductor(id);
    return {
      state: state,
      message: message
    }
  }

}
