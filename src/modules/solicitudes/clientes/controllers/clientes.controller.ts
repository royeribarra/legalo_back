import { Body, Controller, Get, Param, Post, Put, Res} from '@nestjs/common';
import { ClienteDTO, ClienteUpdateDTO } from '../dto/cliente.dto';
import { Delete } from '@nestjs/common/decorators';
import { ClientesService } from '../services/clientes.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SucursalesClienteService } from '../../sucursalesCliente/services/sucursalesCliente.service';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(
    private readonly clientesService: ClientesService,
    private readonly sucursalService: SucursalesClienteService
    ) {}

  @Post('login')
  public async validateCliente(@Body() body, @Res() response: Response){
    
    const existeCliente = await this.clientesService.existeClienteByCodigo(body.codigo);
    const existeSucursalCliente = await this.sucursalService.existeSucursalByCodigo(body.codigo);
    if (existeCliente) {
      return response.json({
        message: 'Cliente existente.',
        cliente: 1,
        state: true
      });
    } else if(existeSucursalCliente){
      return response.json({
        message: 'Sucursal de cliente existente.',
        cliente: 2,
        state: true
      });
    } 

    return response.json({
      message: 'No existe ningún cliente con el código ingresado.',
      cliente: 3,
      state: false
    });

  }

  @Post('register')
  public async registerCliente(@Body() body:ClienteDTO){
    return await this.clientesService.createCliente(body);
  }

  @Get('all')
  public async findAllClientes()
  {
    return await this.clientesService.findClientes();
  }

  @Get(':id')
  public async findClienteById(@Param('id') id: string){
    return await this.clientesService.findClienteById(id);
  }

  @Put('edit/:id')
  public async updateCliente(@Body() body: ClienteUpdateDTO, @Param('id') id:string){
    return await this.clientesService.updateCliente(body, id);
  }

  @Delete(':id')
  public async deleteCliente(@Param('id') id:string){
    return await this.clientesService.deleteCliente(id);
  }

}
