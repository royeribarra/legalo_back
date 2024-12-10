import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosEntity } from './pago.entity';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { OfertasEntity } from '../oferta/oferta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PagosEntity,
      OfertasEntity
    ]),
  ],
  providers: [
    PagoService
  ],
  controllers: [
    PagoController
  ]
})

export class PagoModule {}
