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
import { VehiculosService } from '../../../mantenimiento/vehiculos/services/vehiculos.service';
import { TransporteMailService } from '../../../mail/services/transporteMail.service';

@ApiTags('Solicitudes')
@Controller('solicitudes')
export class SolicitudesController {
  constructor(
    private readonly solicitudesService: SolicitudesService,
    private readonly trackerService: TrackerService,
    private readonly clienteMailService: ClienteMailService,
    private readonly comercialMailService: ComercialMailService,
    private readonly transporteMailService: TransporteMailService,
    private readonly clienteService: ClientesService,
    private readonly sucursalClienteService: SucursalesClienteService,
    private readonly vehiculoService: VehiculosService,
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
  public async findSolicitudById(@Param('id') id: number){
    return await this.solicitudesService.findSolicitudById(id);
  }

  @Put('edit/:id')
  public async updateSolicitud(@Body() body: SolicitudUpdateDTO, @Param('id') id: number){
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

  @Post('/asignacion-vehiculo')
  public async asignacionVehiculo(@Body() body: any)
  {
    //body={solicitudId: 2, vehiculoId: 3, clienteId: 1, sucursalId: 2}
    const cliente = await this.clienteService.findClienteById(body.clienteId);
    
    const sucursalCliente = await this.sucursalClienteService.findSucursalById(body.clienteId);
    
    const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);
    
    const { state, message } = await this.solicitudesService.asignacionVehiculo(body);
    
    const mailVehiculoAsignado = await this.transporteMailService.nuevaAsignacion(sucursalCliente, cliente, vehiculo);

    return {
      state: true,
      message: message
    };
  }

  @Post('/asignacion-transportista')
  public async asignacionTransportista(@Body() body: any)
  {
    const { state, message } = await this.solicitudesService.asignacionTranportista(body);
  
    return {
      state: state,
      message: message
    };
  }

  @Post('/indicar-llegada-cliente')
  public async indicarHoraLlegadaCliente(@Body() body: any)
  {
    //body={solicitudId: 2, clienteId: 1, sucursalId: 2}
    
    const { state, message } = await this.solicitudesService.indicarHoraLlegadaCliente(body.solicitudId);

    return {
      state: state,
      message: message
    };
  }

  @Post('/indicar-salida-cliente')
  public async indicarHoraSalidaCliente(@Body() body: any)
  {
    //body={solicitudId: 2, clienteId: 1, sucursalId: 2}
    
    const { state, message } = await this.solicitudesService.indicarHoraSalidaCliente(body.solicitudId);

    return {
      state: state,
      message: message
    };
  }

  @Post('/asignar-cantidad-residuo')
  public async asignarCantidadResiduo(@Body() body: any)
  {
    //body={solicitudId: 2, clienteId: 1, sucursalId: 2}
    
    const { state, message } = await this.solicitudesService.asignarCantidadResiduo(body);

    return {
      state: state,
      message: message
    };
  }
}
