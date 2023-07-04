import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { SolicitudDTO, SolicitudUpdateDTO } from '../dto/solicitud.dto';
import { Delete } from '@nestjs/common/decorators';
import { SolicitudesService } from '../services/solicitudes.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('solicitudes')
@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Post('register')
  public async registerHerramienta(@Body() body:SolicitudDTO){
    return await this.solicitudesService.createSolicitud(body);
  }

  @Get('all')
  public async findAllHerramientas()
  {
    return await this.solicitudesService.findSolicitudes();
  }

  @Get(':id')
  public async findHerramientaById(@Param('id') id: string){
    return await this.solicitudesService.findSolicitudById(id);
  }

  @Put('edit/:id')
  public async updateHerramienta(@Body() body: SolicitudUpdateDTO, @Param('id') id:string){
    return await this.solicitudesService.updateSolicitud(body, id);
  }

  @Delete(':id')
  public async deleteHerramienta(@Param('id') id:string){
    return await this.solicitudesService.deleteSolicitud(id);
  }

}
