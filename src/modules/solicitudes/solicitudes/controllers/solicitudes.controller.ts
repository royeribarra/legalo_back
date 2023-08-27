import { Body, Controller, Get, Param, Post, Put, Res, Query } from '@nestjs/common';
import { SolicitudDTO, SolicitudUpdateDTO } from '../dto/solicitud.dto';
import { Delete } from '@nestjs/common/decorators';
import { SolicitudesService } from '../services/solicitudes.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { TrackerService } from '../../tracker/services/tracker.service';
import { ClienteMailService } from 'src/modules/mail/services/clienteMail.service';
import { ComercialMailService } from 'src/modules/mail/services/comercialMail.service';
import { ClientesService } from '../../clientes/services/clientes.service';
import { SucursalesClienteService } from '../../sucursalesCliente/services/sucursalesCliente.service';

@ApiTags('Solicitudes')
@Controller('solicitudes')
export class SolicitudesController {
  constructor(
    private readonly solicitudesService: SolicitudesService,
    private readonly trackerService: TrackerService,
    private readonly clienteMailService: ClienteMailService,
    private readonly comercialMailService: ComercialMailService,
    private readonly clienteService: ClientesService,
    private readonly sucursalClienteService: SucursalesClienteService,
  ) {}

  @Post('create')
  public async registerSolicitud(@Body() body: SolicitudDTO){
    
    const newTracker = await this.trackerService.createTracker(body.fechaSolicitud);
    
    const { message, state, solicitud} = await this.solicitudesService.createSolicitud(body, newTracker.tracker);

    if(!solicitud)
    {
      return {
        state: false,
        message: 'Hubo un problema al crear la solicitud.' 
      };
    }
    
    await this.trackerService.asignSolicitud(newTracker.tracker, solicitud);

    const cliente = await this.clienteService.findClienteById(body.clienteId);
    const sucursalCliente = await this.sucursalClienteService.findSucursalById(body.sucursalId);

    //const mailSolicitudRecojo = await this.clienteMailService.solicitudRecojo(sucursalCliente, cliente, body.residuos);
    //const mailNuevaSolicitud = await this.comercialMailService.nuevaSolicitud(sucursalCliente, cliente, body.residuos);

    return {
      state: true,
      message: message
    };
  }

  @Get('all')
  public async findAllSolicitud(@Query() queryParams: any)
  {
    return await this.solicitudesService.findSolicitudes(queryParams);
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

  @Get('/cliente/:clienteId/all')
  public async findAllSolicitudesByCliente(
    @Param('clienteId') id:string
  )
  {
    return await this.solicitudesService.findSolicitudesBy();
  }

  @Get('/asignacion-vehiculo/:solicitudId')
  public async asignacionVehiculo(@Param('clienteId') id:string)
  {
    return await this.solicitudesService.findSolicitudesBy();
  }

  @Get('/sucursal/:clienteId/:sucursalId/all')
  public async findAllSolicitudesBySucursal(
    @Param('clienteId') clienteId:string,
    @Param('sucursalId') sucursalId: string
  )
  {
    return await this.solicitudesService.findSolicitudesByClienteIdBySucursalId(clienteId, sucursalId);
  }
}
