import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { AreaEmpresaDTO, AreaEmpresaUpdateDTO } from '../dto/areaEmpresa.dto';
import { Delete } from '@nestjs/common/decorators';
import { AreaEmpresaService } from '../services/areaEmpresa.service';

@Controller('areas-empresa')
export class AreaEmpresaController {
  constructor(private readonly herramientasService: AreaEmpresaService) {}

  @Post('create')
  public async registerHerramienta(@Body() body:AreaEmpresaDTO){
    return await this.herramientasService.createCliente(body);
  }

  @Get('all')
  public async findAllHerramientas()
  {
    return await this.herramientasService.findClientes();
  }

  @Get(':id')
  public async findHerramientaById(@Param('id') id: string){
    return await this.herramientasService.findClienteById(id);
  }

  @Put('edit/:id')
  public async updateHerramienta(@Body() body: AreaEmpresaUpdateDTO, @Param('id') id:string){
    return await this.herramientasService.updateCliente(body, id);
  }

  @Delete(':id')
  public async deleteHerramienta(@Param('id') id:string){
    return await this.herramientasService.deleteCliente(id);
  }

}
