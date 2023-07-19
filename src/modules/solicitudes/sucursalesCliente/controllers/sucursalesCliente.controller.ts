import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { SucursalClienteDTO, SucursalClienteUpdateDTO } from '../dto/sucursalCliente.dto';
import { Delete } from '@nestjs/common/decorators';
import { SucursalesClienteService } from '../services/sucursalesCliente.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Sucursales Cliente')
@Controller('sucursales-client')
export class SucursalesClienteController {
  constructor(private readonly sucursalesService: SucursalesClienteService) {}

  @Post('register')
  public async registerHerramienta(@Body() body:SucursalClienteDTO){
    return await this.sucursalesService.createSucursal(body);
  }

  @Get('all')
  public async findAllHerramientas()
  {
    return await this.sucursalesService.findSucursales();
  }

  @Get(':id')
  public async findHerramientaById(@Param('id') id: string){
    return await this.sucursalesService.findSucursalById(id);
  }

  @Put('edit/:id')
  public async updateHerramienta(@Body() body: SucursalClienteUpdateDTO, @Param('id') id:string){
    return await this.sucursalesService.updateSucursal(body, id);
  }

  @Delete(':id')
  public async deleteHerramienta(@Param('id') id:string){
    return await this.sucursalesService.deleteSucursal(id);
  }

}
