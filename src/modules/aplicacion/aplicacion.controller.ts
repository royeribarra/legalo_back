import { Body, Controller, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { ApiTags } from '@nestjs/swagger';
import { AplicacionCreateDTO } from './aplicacion.dto';
import { AplicacionesService } from './aplicaciones.service';

@ApiTags('Aplicaciones')
@Controller('aplicaciones')
export class AplicacionesController {
  constructor(
    private readonly aplicacionService: AplicacionesService,
    ) {}

  @Post('crear')
  public async crearAplicacion(@Body() body: AplicacionCreateDTO) {
    const aplicacion = await this.aplicacionService.createAplicacion(body);
    return {
      state: true,
      message: 'Aplicación creada con éxito',
      data: aplicacion,
    };
  }

  @Get('all/:abogadoId')
  public async findAllAplicacionesByAbogadoId(@Param('abogadoId') abogadoId: number)
  {
    return await this.aplicacionService.findAplicacionesByAbogadoId(abogadoId);
  }

  @Post('update-archivos')
  public async updateArchivosAbogado(@Body() body: { abogadoId: number, clienteId: number, aplicacionId: number })
  {
    const {state, message} = await this.aplicacionService.updateArchivosAplicacion(body.abogadoId, body.clienteId, body.aplicacionId);
    return {
      state: state,
      message: message,
    }
  }
}