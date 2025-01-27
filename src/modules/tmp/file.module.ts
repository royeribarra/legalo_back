import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileEntity } from './file.entity';
import { MulterModule } from '@nestjs/platform-express';
import { OfertasEntity } from '../oferta/oferta.entity';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FileEntity,
      OfertasEntity,
      AplicacionesEntity,
      TrabajosEntity,
      AbogadosEntity
    ]),
    MulterModule.register({
      dest: './temp',
    }),
  ],
  providers: [
    FileService
  ],
  controllers: [
    FileController
  ],
  exports: [
    FileService,
    TypeOrmModule
  ]
})

export class FileModule {}
