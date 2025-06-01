import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertasEntity } from '../oferta/oferta.entity';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { TrabajosService } from '../trabajo/trabajo.service';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { ProgresoTrabajoEntity } from '../trabajo/progreso.entity';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OfertasEntity,
      AplicacionesEntity,
      TrabajosEntity,
      ClientesEntity,
      AbogadosEntity,
      ProgresoTrabajoEntity
    ]),
  ],
  providers: [
    PdfService
  ],
  controllers: [
    PdfController
  ]
})

export class PdfModule {}
