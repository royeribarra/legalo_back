// src/trabajos/controllers/trabajos.controller.ts
import { Controller, Param, Put, Body, Get, Post, Query } from '@nestjs/common';
import { ActualizarProgresoDTO, CrearTrabajoDTO } from './trabajo.dto';
import { TrabajosService } from './trabajo.service';

@Controller('trabajos')
export class TrabajosController {
  constructor(private readonly trabajosService: TrabajosService) {}

  @Post('create')
  public async createTrabajo(@Body() data: CrearTrabajoDTO) {
    const trabajo = await this.trabajosService.createTrabajo(data);

    return {
      state: true,
      trabajo,
      message: "Trabajo creado con éxito."
    }
  }

  @Get('all')
  public async findAllTrabajos(@Query() queryParams: any)
  {
    const { daysAgo = 3 } = queryParams;
    return await this.trabajosService.findTrabajos(queryParams);
  }

  @Get(':id')
  public async findTrabajoById(@Param('id') id: number){
    const trabajo = await this.trabajosService.findTrabajoById(id);
    return {
      state: true,
      data: trabajo
    }
  }

  @Put('aceptar-aplicacion/:id')
  public async aceptarAplicacion(
    @Param('id') aplicacionId: number,
    @Body() body: CrearTrabajoDTO
  ) {
    const trabajo = await this.trabajosService.crearTrabajoDesdeAplicacion(
      aplicacionId,
      body
    );
    return {
      state: true,
      message: 'Trabajo creado con éxito',
      data: trabajo,
    };
  }

  @Put('actualizar-progreso')
  public async actualizarProgreso(
    @Body() body: ActualizarProgresoDTO
  ) {
    const trabajo = await this.trabajosService.actualizarProgresoTrabajo(
      body
    );
    return {
      state: true,
      message: 'Progreso del trabajo actualizado con éxito',
      data: trabajo,
    };
  }

  @Post('registrar-progreso')
  public async registrarProgreso(
    @Body() body: any
  ) {
    const trabajo = await this.trabajosService.registrarProgreso(body);
    return {
      state: true,
      message: 'Progreso del trabajo actualizado con éxito',
      data: trabajo,
    };
  }

  @Post('finalizar-trabajo')
  public async finalizarTrabajo(
    @Body() body: any
  ) {
    const trabajo = await this.trabajosService.finalizarTrabajo(body);
    return {
      state: true,
      message: 'Se ha registrado la culminación del trabajo con éxito'
    };
  }

  @Get('cliente/:id/en-progreso')
  async getTrabajosEnTrabajoPorCliente(@Param('id') clienteId: number) {
    return await this.trabajosService.getTrabajosEnProcesoPorCliente(clienteId);
  }

  @Get('cliente/:id/finalizados')
  async getTrabajosFinalizadosPorCliente(@Param('id') clienteId: number) {
    return await this.trabajosService.getTrabajosFinalizadosPorCliente(clienteId);
  }

  @Post('obtener-total-trabajos-por-cliente')
  async obtenerTotalTrabajosPorCliente(@Body() body: any) {
    const response = await this.trabajosService.obtenerTotalTrabajosPorCliente(body);
    return{
      total: response,
      state: true
    }
  }

  @Post('obtener-total-trabajos-por-abogado')
  async obtenerTotalTrabajosPorAbogado(@Body() body: any) {
    const response = await this.trabajosService.obtenerTotalTrabajosPorAbogado(body);
    return{
      total: response,
      state: true
    }
  }
}
