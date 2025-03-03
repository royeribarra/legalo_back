import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertasEntity } from '../oferta/oferta.entity';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { TrabajosService } from '../trabajo/trabajo.service';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { ProgresoTrabajoEntity } from '../trabajo/progreso.entity';
import { PagosAbogadoEntity } from './pagoAbogado.entity';
import { PagoAbogadoService } from './pagoAbogado.service';
import { PagoAbogadoController } from './pagoAbogado.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PagosAbogadoEntity,
      OfertasEntity,
      AplicacionesEntity,
      TrabajosEntity,
      ClientesEntity,
      AbogadosEntity,
      ProgresoTrabajoEntity
    ]),
  ],
  providers: [
    PagoAbogadoService,
    TrabajosService
  ],
  controllers: [
    PagoAbogadoController
  ]
})

export class PagoAbogadoModule {}
