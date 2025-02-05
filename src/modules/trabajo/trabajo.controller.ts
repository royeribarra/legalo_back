// src/trabajos/controllers/trabajos.controller.ts
import { Controller, Param, Put, Body, Get } from '@nestjs/common';
import { ActualizarProgresoDTO, CrearTrabajoDTO } from './trabajo.dto';
import { TrabajosService } from './trabajo.service';

@Controller('trabajos')
export class TrabajosController {
  constructor(private readonly trabajosService: TrabajosService) {}

  // Ruta para aceptar una aplicación y crear un trabajo
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
