import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosEntity } from './pago.entity';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { OfertasEntity } from '../oferta/oferta.entity';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { TrabajosService } from '../trabajo/trabajo.service';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { ProgresoTrabajoEntity } from '../trabajo/progreso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PagosEntity,
      OfertasEntity,
      AplicacionesEntity,
      TrabajosEntity,
      ClientesEntity,
      AbogadosEntity,
      ProgresoTrabajoEntity
    ]),
  ],
  providers: [
    PagoService,
    TrabajosService
  ],
  controllers: [
    PagoController
  ]
})

export class PagoModule {}
