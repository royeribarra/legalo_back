import { Body, Controller, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import { ApiTags } from '@nestjs/swagger';
import { AbogadosService } from '../services/abogados.service';
import { AbogadoDTO, AbogadoUpdateDTO } from '../dto/abogado.dto';

@ApiTags('Abogados')
@Controller('abogados')
export class AbogadosController {
  constructor(
    private readonly abogadosService: AbogadosService,
    ) {}

  @Post('create')
  public async registerAbogado(@Body() body: AbogadoDTO){
    const { state, message, abogado } = await this.abogadosService.createAbogado(body);
    return {
      state: state,
      message: message,
      abogado: abogado
    }
  }

  @Get('all')
  public async findAllAbogados(@Query() queryParams: any)
  {
    return await this.abogadosService.findAbogados(queryParams);
  }

  @Get(':id')
  public async findAbogadoById(@Param('id') id: number){
    return await this.abogadosService.findAbogadoById(id);
  }

  @Put('edit/:id')
  public async updateAbogado(@Body() body: Partial<AbogadoUpdateDTO>, @Param('id') id: number)
  {
    const {state, message} = await this.abogadosService.updateAbogado(body, id);
    return {
      state: state,
      message: message,
    }
  }

  @Post('postular-oferta')
  public async postularOferta(
    @Body('abogadoId') abogadoId: number,
    @Body('ofertaId') ofertaId: number,
    @Body('salarioEsperado') salarioEsperado: number,
    @Body('respuestas') respuestas: any,
    @Body('numeroCuenta') numeroCuenta: string,
    @Body('selectedBanco') selectedBanco: string,
  ) {
    console.log(abogadoId, ofertaId, salarioEsperado, "abogadoId, ofertaId, salarioEsperado")

    const { aplicacionId, state, message } = await this.abogadosService.postularAbogadoOferta(abogadoId, ofertaId, salarioEsperado, respuestas, numeroCuenta, selectedBanco);
    return {
      aplicacionId,
      state,
      message,
    };
  }

  @Post('invitacion-a-ofertas')
  public async getOfertasConInvitacion(@Body('abogadoId') abogadoId: string)
  {
    try {
      const ofertas = await this.abogadosService.getOfertasConInvitacionesPorCliente(Number(abogadoId));
      return {
        state: true,
        message: 'Ofertas obtenidas exitosamente',
        data: ofertas,
      };
    } catch (error) {
      return {
        state: false,
        message: 'Error al obtener las ofertas con invitaciones',
        error: error.message,
      };
    }
  }

  @Post('aplicaciones')
  public async getAplicaciones(
    @Body('abogadoId') abogadoId: number,
    @Body('estado') estado: string = 'pendiente'
  )
  {
    try {
      const aplicaciones = await this.abogadosService.getAplicaciones(abogadoId, estado);
      return {
        state: true,
        message: 'Aplicaciones obtenidas exitosamente',
        data: aplicaciones,
      };
    } catch (error) {
      return {
        state: false,
        message: 'Error al obtener las aplicaciones',
        error: error.message,
      };
    }
  }

  @Post('get-trabajos')
  public async getTrabajos(
    @Body('abogadoId') abogadoId: number, 
    @Body('estado') estado: string
  )
  {
    try {
      const trabajos = await this.abogadosService.getTrabajos(abogadoId, estado);
      return {
        state: true,
        message: 'Trabajos obtenidos exitosamente',
        data: trabajos,
      };
    } catch (error) {
      return {
        state: false,
        message: 'Error al obtener las trabajos',
        error: error.message,
      };
    }
  }
}