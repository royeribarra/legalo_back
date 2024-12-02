// src/trabajos/controllers/trabajos.controller.ts
import { Controller, Param, Put, Body } from '@nestjs/common';
import { TrabajosService } from '../services/trabajos.service';
import { CrearTrabajoDTO } from '../dto/crear-trabajo.dto';

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

  @Put('actualizar-progreso/:id')
  public async actualizarProgreso(
    @Param('id') trabajoId: number,
    @Body() body: ActualizarProgresoDTO
  ) {
    const trabajo = await this.trabajosService.actualizarProgresoTrabajo(
      trabajoId,
      body
    );
    return {
      state: true,
      message: 'Progreso del trabajo actualizado con éxito',
      data: trabajo,
    };
  }
}
