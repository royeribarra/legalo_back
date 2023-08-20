import { Body, Controller, Get, Param, Post, Put, Res} from '@nestjs/common';
import { ClienteDTO, ClienteUpdateDTO } from '../dto/cliente.dto';
import { Delete } from '@nestjs/common/decorators';
import { ClientesService } from '../services/clientes.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { SucursalesClienteService } from '../../sucursalesCliente/services/sucursalesCliente.service';

@ApiTags('Clientes')
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
      const jwt = await this.clientesService.generateJWT(1, existeCliente);
      return response.json({
        message: 'Cliente existente.',
        state: true,
        info: jwt
      });
    } else if(existeSucursalCliente){
      const jwt = await this.clientesService.generateJWT(2, existeSucursalCliente);
      return response.json({
        message: 'Sucursal de cliente existente.',
        state: true,
        info: jwt
      });
    } 

    return response.json({
      message: 'No existe ningún cliente con el código ingresado.',
      cliente: 3,
      state: false
    });

  }

  @Post('create')
  public async registerCliente(@Body() body:ClienteDTO){
    const {state, message, cliente } =  await this.clientesService.createCliente(body);
    return {
      state: state,
      message: message,
      usuario: cliente
    }
  }

  @Get('all')
  public async findAllClientes()
  {
    return await this.clientesService.findClientes();
  }

  @Get(':id')
  public async findClienteById(@Param('id') id: number){
    return await this.clientesService.findClienteById(id);
  }

  @Put('edit/:id')
  public async updateCliente(@Body() body: ClienteUpdateDTO, @Param('id') id:number){
    const { state, message } = await this.clientesService.updateCliente(body, id);
    return {
      state: state,
      message: message,
    }
  }

  @Delete(':id')
  public async deleteCliente(@Param('id') id:number){
    return await this.clientesService.deleteCliente(id);
  }
}