import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { ClienteDTO, ClienteUpdateDTO } from '../dto/cliente.dto';
import { Delete } from '@nestjs/common/decorators';
import { ClientesService } from '../services/clientes.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

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
