// src/aplicaciones/aplicaciones.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfertasEntity } from '../oferta/oferta.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { AplicacionesEntity } from './aplicaciones.entity';
import { AplicacionesController } from './aplicacion.controller';
import { AplicacionesService } from './aplicaciones.service';
import { TmpImageFileEntity } from '../tmp/tmpImgFile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AplicacionesEntity, 
      OfertasEntity, 
      AbogadosEntity,
      TmpImageFileEntity
    ]),
  ],
  controllers: [AplicacionesController],
  providers: [AplicacionesService],
})
export class AplicacionesModule {}
