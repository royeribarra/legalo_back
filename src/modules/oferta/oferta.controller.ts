import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe  } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { ApiTags } from '@nestjs/swagger';
import { OfertaService } from './oferta.service';
import { OfertaDTO } from './oferta.dto';
import { FormDataRequest } from "nestjs-form-data";

@ApiTags('Ofertas')
@Controller('ofertas')
export class OfertaController {
  constructor(
    private readonly ofertaService: OfertaService,
    ) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true }))
  // @UseInterceptors(FileInterceptor('file')) 
  // @FormDataRequest()
  public async registerOferta(@Body() body: OfertaDTO){
    // const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);
    const { state, message, oferta } = await this.ofertaService.createOferta(body);
    return {
      state: state,
      message: message,
      oferta: oferta
    }
  }

  // @Get('all')
  // public async findAllConductores(@Query() queryParams: any)
  // {
  //   return await this.abogadosService.findConductores(queryParams);
  // }

  @Get(':id')
  public async findConductorById(@Param('id') id: number){
    return await this.ofertaService.findOfertaById(id);
  }

  @Get('cliente/:id/sin-aplicaciones')
  async getOfertasClienteSinAplicaciones(@Param('id') clienteId: number) {
    return this.ofertaService.getOfertasSinAplicacionesPorCliente(clienteId);
  }

  @Get('cliente/:id/con-aplicaciones')
  async getOfertasClienteConAplicaciones(@Param('id') clienteId: number) {
    return this.ofertaService.getOfertasConAplicacionesPorCliente(clienteId);
  }

  @Post('sin-aplicaciones-por-abogado')
  async getOfertasSinAplicacionesPorAbogado(@Body() body) {
    return this.ofertaService.getOfertasSinAplicacionesPorAbogado(body.clienteId, body.abogadoId);
  }
}