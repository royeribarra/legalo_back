import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { AreaEmpresaDTO, AreaEmpresaUpdateDTO } from '../dto/areaEmpresa.dto';
import { Delete } from '@nestjs/common/decorators';
import { AreaEmpresaService } from '../services/areaEmpresa.service';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Areas Empresa')
@Controller('areas-empresa')
export class AreaEmpresaController {
  constructor(private readonly herramientasService: AreaEmpresaService) {}

  @ApiResponse({
    status: 201,
    description: "Area empresa creada correctamente."
  })
  @Post('create')
  public async registerAreaEmpresa(@Body() body:AreaEmpresaDTO){
    return await this.herramientasService.createAreaEmpresa(body);
  }

  @ApiResponse({
    status: 200,
    description: "Areas obtenidas correctamente."
  })
  @Get('all')
  public async findAllAreasEmpresa()
  {
    return await this.herramientasService.findAreasEmpresa();
  }

  @ApiResponse({
    status: 200,
    description: "Información del área con Id especificado."
  })
  @ApiResponse({
    status: 404,
    description: "No se encontró al área con el Id especificado."
  })
  @ApiParam({
    name: 'id'
  })
  @Get(':id')
  public async findAreaEmpresaById(@Param('id') id: number){
    return await this.herramientasService.findAreaEmpresaById(id);
  }

  @ApiResponse({
    status: 200,
    description: "Información del área actualizado."
  })
  @ApiResponse({
    status: 404,
    description: "No se encontró al área con el Id especificado."
  })
  @ApiParam({
    name: 'id'
  })
  @Put('edit/:id')
  public async updateAreaEmpresa(@Body() body: AreaEmpresaUpdateDTO, @Param('id') id:string){
    return await this.herramientasService.updateAreaEmpresa(body, id);
  }

  @ApiResponse({
    status: 200,
    description: "Información del área eliminada."
  })
  @ApiResponse({
    status: 404,
    description: "No se encontró al área con el Id especificado."
  })
  @ApiParam({
    name: 'id'
  })
  @Delete(':id')
  public async deleteAreaEmpresa(@Param('id') id:number){
    return await this.herramientasService.deleteAreaEmpresa(id);
  }

}
