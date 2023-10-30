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
import { ResiduosRecojoEntity } from '../../residuosRecojo/entities/residuosRecojo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@ApiTags('Solicitudes')
@Controller('solicitudes')
export class SolicitudesController {
  constructor(
    @InjectRepository(ResiduosRecojoEntity) private readonly residuoRecojoRepository: Repository<ResiduosRecojoEntity>,
    private readonly solicitudesService: SolicitudesService,
    private readonly trackerService: TrackerService,
    private readonly clienteMailService: ClienteMailService,
    private readonly comercialMailService: ComercialMailService,
    private readonly transporteMailService: TransporteMailService
  ) {}

  @Post('create')
  public async registerSolicitud(@Body() body: SolicitudDTO)
  {
    
    const newTracker = await this.trackerService.createTracker(body.fechaSolicitud);
    
    const { message, state, solicitud} = await this.solicitudesService.createSolicitud(body, newTracker.tracker);

    const asignSolicitud = await this.trackerService.asignSolicitud(newTracker.tracker, solicitud);

    const mailSolicitudRecojo = await this.clienteMailService.solicitudRecojo(solicitud.sucursal, solicitud.cliente, solicitud.residuosRecojo);
    const mailNuevaSolicitud = await this.comercialMailService.nuevaSolicitud(solicitud.sucursal, solicitud.cliente, solicitud.residuosRecojo);

    return {
      state: state,
      message: message
    };
  }

  @Post('reprogramar')
  public async reprogramarSolicitud(@Body() body: any)
  {
    const { state, message } = await this.solicitudesService.reprogramarSolicitud(body);
    return {
      state: state,
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
    const { state, message } = await this.solicitudesService.asignacionVehiculo(body);
    
    const mailVehiculoAsignado = await this.transporteMailService.asignacionVehiculo(body.clienteId, body.sucursalId, body.vehiculoId);

    return {
      state: state,
      message: message
    };
  }

  @Post('/asignacion-transportista')
  public async asignacionTransportista(@Body() body: any)
  {
    
    const { state, message } = await this.solicitudesService.asignacionTranportista(body);
    // const mailSolicitudRecojo = await this.clienteMailService.solicitudRecojo(solicitud.sucursal, solicitud.cliente, solicitud.residuosRecojo);
    return {
      state: state,
      message: message
    };
  }

  @Post('/indicar-camino-recojo')
  public async indicarHoraCaminoRecojo(@Body() body: any)
  {
    //body={solicitudId: 2, clienteId: 1, sucursalId: 2}
    
    const { state, message } = await this.solicitudesService.indicarHoraCaminoRecojo(body.solicitudId);

    // const mailSolicitudRecojo = await this.clienteMailService.solicitudRecojo(solicitud.sucursal, solicitud.cliente, solicitud.residuosRecojo);
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

    // const mailSolicitudRecojo = await this.clienteMailService.solicitudRecojo(solicitud.sucursal, solicitud.cliente, solicitud.residuosRecojo);
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
    // const mailSolicitudRecojo = await this.clienteMailService.solicitudRecojo(solicitud.sucursal, solicitud.cliente, solicitud.residuosRecojo);

    return {
      state: state,
      message: message
    };
  }

  @Post('/indicar-llegada-planta')
  public async indicarHoraLlegadaPlanta(@Body() body: any)
  {
    //body={solicitudId: 2, clienteId: 1, sucursalId: 2}
    
    const { state, message } = await this.solicitudesService.indicarHoraLlegadaPlanta(body.solicitudId);
    // const mailSolicitudRecojo = await this.clienteMailService.solicitudRecojo(solicitud.sucursal, solicitud.cliente, solicitud.residuosRecojo);

    return {
      state: state,
      message: message
    };
  }

  @Post('/asignar-cantidad-residuo')
  public async asignarCantidadResiduo(@Body() body: any)
  {
    const { state, message } = await this.solicitudesService.asignarCantidadResiduo(body);

    return {
      state: state,
      message: message
    };
  }

  @Post('/recepcion-asignar-cantidad')
  public async validarCantidadIngresadaRecepcion(@Body() body: any)
  {
    //body={solicitudId: 2, clienteId: 1, sucursalId: 2}
    
    const { state, message } = await this.solicitudesService.validarCantidadIngresadaRecepcion(body.solicitudId);

    return {
      state: state,
      message: message
    };
  }

  @Post('/calidad-asignar-cantidad')
  public async validarCantidadIngresadaCalidad(@Body() body: any)
  {
    //body={solicitudId: 2, clienteId: 1, sucursalId: 2}
    
    const { state, message } = await this.solicitudesService.validarCantidadIngresadaCalidad(body.solicitudId);

    return {
      state: state,
      message: message
    };
  }
}
