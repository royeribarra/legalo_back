import { Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { ClienteService } from '../services/clientes.service';
import { ClienteDTO } from '../dto/cliente.dto';

@ApiTags('Clientes')
@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
    ) {}

  @Post('create')
  public async registerAbogado(@Body() body: ClienteDTO){
    // const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);
    const { state, message, abogado } = await this.clienteService.createCliente(body);
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
  public async findClienteById(@Param('id') id: number){
    return await this.clienteService.findClienteById(id);
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