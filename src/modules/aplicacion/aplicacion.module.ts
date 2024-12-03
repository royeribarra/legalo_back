// src/aplicaciones/aplicaciones.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertasEntity } from '../oferta/oferta.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { AplicacionesEntity } from './aplicaciones.entity';
import { AplicacionesController } from './aplicacion.controller';
import { AplicacionesService } from './aplicaciones.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AplicacionesEntity, OfertasEntity, AbogadosEntity]),
  ],
  controllers: [AplicacionesController],
  providers: [AplicacionesService],
})
export class AplicacionesModule {}
