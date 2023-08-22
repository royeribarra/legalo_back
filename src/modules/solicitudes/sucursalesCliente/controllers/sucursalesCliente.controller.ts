import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { SucursalClienteDTO, SucursalClienteUpdateDTO } from '../dto/sucursalCliente.dto';
import { Delete } from '@nestjs/common/decorators';
import { SucursalesClienteService } from '../services/sucursalesCliente.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Sucursales Cliente')
@Controller('sucursales-cliente')
export class SucursalesClienteController {
  constructor(private readonly sucursalesService: SucursalesClienteService) {}

  @Post('create')
  public async registerSucursal(@Body() body: SucursalClienteDTO){
    const {state, message, cliente } = await this.sucursalesService.createSucursal(body);
    return {
      state: state,
      message: message,
      usuario: cliente
    }
  }

  @Get('all')
  public async findAllSucursales()
  {
    return await this.sucursalesService.findSucursales();
  }

  @Get('all/:clienteId')
  public async findAllSucursalesByCliente(@Param('clienteId') clienteId: string)
  {
    return await this.sucursalesService.findSucursalesByClienteId(clienteId);
  }

  @Get(':id')
  public async findSucursalById(@Param('id') id: string){
    return await this.sucursalesService.findSucursalById(id);
  }

  @Put('edit/:id')
  public async updateSucursal(@Body() body: SucursalClienteUpdateDTO, @Param('id') id:string){
    const { state, message } = await this.sucursalesService.updateSucursal(body, id);
    return {
      state: state,
      message: message,
    }
  }

  @Delete(':id')
  public async deleteSucursal(@Param('id') id:string){
    const { state, message } = await this.sucursalesService.deleteSucursal(id);
    return {
      state: state,
      message: message,
    }
  }

}
