import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { SolicitudDTO, SolicitudUpdateDTO } from '../dto/solicitud.dto';
import { Delete } from '@nestjs/common/decorators';
import { SolicitudesService } from '../services/solicitudes.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TrackerService } from '../../tracker/services/tracker.service';

@ApiTags('Solicitudes')
@Controller('solicitudes')
export class SolicitudesController {
  constructor(
    private readonly solicitudesService: SolicitudesService,
    private readonly trackerService: TrackerService
  ) {}

  @Post('create')
  public async registerSolicitud(@Body() body: SolicitudDTO){
    const newTracker = await this.trackerService.createTracker(body.fechaSolicitud);
    
    const { message, state, solicitud} = await this.solicitudesService.createSolicitud(body, newTracker);

    if(!solicitud)
    {
      return {
        state: false,
        message: 'Hubo un problema al crear la solicitud.' 
      };
    }

    await this.trackerService.asignSolicitud(newTracker, solicitud);
    const emailConfirmacion = await this.solicitudesService.sendEmailConfirmation();

    return {
      state: true,
      message: message
    };
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
