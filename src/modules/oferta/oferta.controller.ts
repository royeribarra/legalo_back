import { Body, Controller, Get, Param, Post, Put,UploadedFile, UseInterceptors, UsePipes, ValidationPipe  } from '@nestjs/common';
import { Delete, Query } from '@nestjs/common/decorators';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { ApiTags } from '@nestjs/swagger';
import { OfertaService } from './oferta.service';
import { OfertaDTO, OfertaUpdateDTO } from './oferta.dto';
import { FormDataRequest } from "nestjs-form-data";

@ApiTags('Ofertas')
@Controller('ofertas')
export class OfertaController {
  constructor(
    private readonly ofertaService: OfertaService,
    ) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createOferta(@Body() body: OfertaDTO){
    const { state, message, oferta } = await this.ofertaService.createOferta(body);
    return {
      state: state,
      message: message,
      oferta: oferta
    }
  }

  @Get('all')
  public async findAllOfertas(@Query() queryParams: any)
  {
    const { daysAgo = 3 } = queryParams;
    return await this.ofertaService.findOfertas(queryParams);
  }

  @Get(':id')
  public async findConductorById(@Param('id') id: number){
    return await this.ofertaService.findOfertaById(id);
  }

  @Put('edit/:id')
  public async updateOferta(@Body() body: Partial<OfertaUpdateDTO>, @Param('id') id: number)
  {
    const {state, message} = await this.ofertaService.updateOferta(body, id);
    return {
      state: state,
      message: message,
    }
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

  @Post('invitar-abogado')
  async invitarAbogadoOferta(@Body() body) {
    const { state, message, saveInvitacion } = await this.ofertaService.crearInvitacion(body.abogadoId, body.ofertaId);
     return {
      state: state,
      message: message
     }
  }
}