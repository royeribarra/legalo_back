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
  public async registerSolicitud(@Body() body: SolicitudDTO){
    return body;
    return await this.solicitudesService.createSolicitud(body);
  }

  @Get('all')
  public async findAllSolicitud()
  {
    return await this.solicitudesService.findSolicitudes();
  }

  @Get(':id')
  public async findSolicitudById(@Param('id') id: string){
    return await this.solicitudesService.findSolicitudById(id);
  }

  @Put('edit/:id')
  public async updateSolicitud(@Body() body: SolicitudUpdateDTO, @Param('id') id:string){
    return await this.solicitudesService.updateSolicitud(body, id);
  }

  @Delete(':id')
  public async deleteSolicitud(@Param('id') id:string){
    return await this.solicitudesService.deleteSolicitud(id);
  }

}
