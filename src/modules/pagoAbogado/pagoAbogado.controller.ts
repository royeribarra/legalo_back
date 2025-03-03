import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PagoAbogadoDTO } from './pagoAbogado.dto';
import { PagoAbogadoService } from './pagoAbogado.service';
import { ErrorManager } from '../../utils/error.manager';

@ApiTags('Pagos')
@Controller('pagos-abogado')
export class PagoAbogadoController {
  constructor(
    private readonly pagoService: PagoAbogadoService,
  ) {}

  @Post('create')
  async registrarPago(@Body() data: PagoAbogadoDTO) {
    try {
      const pago = await this.pagoService.realizarPagoAbogado(data);
      return {
        state: true,
        message: "Pago guardado con éxito."
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  @Get('all')
  public async findAllPagos(@Query() queryParams: any)
  {
    console.log("por hacer");
    return;
  }
}