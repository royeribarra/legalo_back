// src/aplicaciones/aplicaciones.module.ts
import { Module } from '@nestjs/common';
import { AplicacionesController } from './controllers/aplicaciones.controller';
import { AplicacionesService } from './services/aplicaciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AplicacionesEntity } from './entities/aplicaciones.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AplicacionesEntity, OfertasEntity, AbogadosEntity]),
  ],
  controllers: [AplicacionesController],
  providers: [AplicacionesService],
})
export class AplicacionesModule {}
