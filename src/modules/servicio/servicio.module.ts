import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioController } from './servicio.controller';
import { ServicioService } from './servicio.service';
import { ServiciosEntity } from './servicios.entity';
import { ServiciosAbogadoEntity } from './servicioAbogado.entity';
import { ServiciosOfertaEntity } from './servicioOferta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiciosEntity,
      ServiciosAbogadoEntity,
      ServiciosOfertaEntity
    ]),
  ],
  providers: [
    ServicioService
  ],
  controllers: [
    ServicioController
  ]
})

export class ServicioModule {}
