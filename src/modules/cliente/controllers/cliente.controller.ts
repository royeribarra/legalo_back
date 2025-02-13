import { Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { ClienteService } from '../services/clientes.service';
import { ClienteDTO, ClienteUpdateDTO } from '../dto/cliente.dto';

@ApiTags('Clientes')
@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
    ) {}

  @Post('create')
  public async registerCliente(@Body() body: ClienteDTO){
    // const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);
    const { state, message, cliente } = await this.clienteService.createCliente(body);
    return {
      state: state,
      message: message,
      cliente: cliente
    }
  }

  @Get('all')
  public async findAllClientes(@Query() queryParams: any)
  {
    return await this.clienteService.findClientes(queryParams);
  }

  @Get(':id')
  public async findClienteById(@Param('id') id: number){
    return await this.clienteService.findClienteById(id);
  }

  @Put('edit/:id')
  public async updateAbogado(@Body() body: Partial<ClienteUpdateDTO>, @Param('id') id: number)
  {
    const {state, message} = await this.clienteService.updateCliente(body, id);
    return {
      state: state,
      message: message,
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

  @Get(':id/ofertas')
  async getOfertasByCliente(@Param('id') clienteId: number) {
    return this.clienteService.getOfertasByCliente(clienteId);
  }

  @Post('get-trabajos')
  public async getTrabajos(
    @Body('clienteId') clienteId: number,
    @Body('estado') estado: string
  )
  {
    try {
      const trabajos = await this.clienteService.getTrabajos(clienteId, estado);
      return {
        state: true,
        message: 'Trabajos obtenidos exitosamente',
        data: trabajos,
      };
    } catch (error) {
      return {
        state: false,
        message: 'Error al obtener las trabajos',
        error: error.message,
      };
    }
  }

  // @Post('ofertas/con-aplicaciones')
  // async getOfertasClienteConAplicaciones(@Body('clienteId') clienteId: number) {
  //   console.log("llegué aquí")
  //   return this.clienteService.getOfertasConAplicaciones(clienteId);
  // }

  @Post('get-ofertas')
  async getOfertas(
    @Body('clienteId') clienteId: number,
    @Body('estado') estado: string,
  ) {
    console.log("ofertas en la linea ...")
    const { data, state } = await this.clienteService.getOfertas(clienteId, estado);
     return {
      data,
      state
     }
  }

  @Post('update-documento-oferta')
  async updateDocumentoOferta(
    @Body('clienteId') clienteId: number,
    @Body('ofertaId') ofertaId: number
  ) {
    return this.clienteService.updateArchivosOferta(clienteId, ofertaId);
  }
}