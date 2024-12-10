import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PagoDTO } from './pago.dto';
import { PagoService } from './pago.service';

@ApiTags('Pagos')
@Controller('pagos')
export class PagoController {
  constructor(
    private readonly pagoService: PagoService,
  ) {}

  @Post('create')
  async realizarPago(@Body() data: { clienteId: number; ofertaId: number; monto: number; operacion: string }) {
    const pago = await this.pagoService.realizarPagoOferta(data.clienteId, data.ofertaId, data.monto, data.operacion);
    return {
      state: true,
      message: "Pago guardado con éxito."
    }
  }
}