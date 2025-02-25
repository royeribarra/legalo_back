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

  @Get('cliente/:id/en-progreso')
  async getTrabajosEnTrabajoPorCliente(@Param('id') clienteId: number) {
    return this.trabajosService.getTrabajosEnProcesoPorCliente(clienteId);
  }

  @Get('cliente/:id/finalizados')
  async getTrabajosFinalizadosPorCliente(@Param('id') clienteId: number) {
    return this.trabajosService.getTrabajosFinalizadosPorCliente(clienteId);
  }
}
