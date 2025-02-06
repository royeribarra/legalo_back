import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe  } from '@nestjs/common';
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
  async realizarPago(@Body() data: PagoDTO) {
    const pago = await this.pagoService.realizarPagoOferta(data);

    return {
      state: true,
      message: "Pago guardado con éxito."
    }
  }

  @Post('create-only-pago')
  async realizarSoloPago(@Body() data: PagoDTO) {
    const pago = await this.pagoService.realizarPago(data);

    return {
      state: true,
      message: "Pago guardado con éxito."
    }
  }

  @Get('all')
  public async findAllPagos(@Query() queryParams: any)
  {
    console.log("por hacer");
    return;
  }
}