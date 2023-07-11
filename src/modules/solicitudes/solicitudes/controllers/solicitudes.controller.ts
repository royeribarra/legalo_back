import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { SolicitudDTO, SolicitudUpdateDTO } from '../dto/solicitud.dto';
import { Delete } from '@nestjs/common/decorators';
import { SolicitudesService } from '../services/solicitudes.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TrackerService } from '../../tracker/services/tracker.service';

@ApiTags('solicitudes')
@Controller('solicitudes')
export class SolicitudesController {
  constructor(
    private readonly solicitudesService: SolicitudesService,
    private readonly trackerService: TrackerService
  ) {}

  @Post('register')
  public async registerSolicitud(@Body() body: SolicitudDTO, @Res() response: Response){
    const newTracker = await this.trackerService.createTracker(body.fechaSolicitud);
    
    const newSolicitud = await this.solicitudesService.createSolicitud(body, newTracker);

    await this.trackerService.asignSolicitud(newTracker, newSolicitud);

    if(!newSolicitud)
    {
      return response.json({
        status: 500,
        message: 'Hubo un problema al crear la solicitud.' 
      });
    }

    const emailConfirmacion = await this.solicitudesService.sendEmailConfirmation();

    return emailConfirmacion;
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
