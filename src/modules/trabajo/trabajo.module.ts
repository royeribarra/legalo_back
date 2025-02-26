// src/trabajos/trabajos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { TrabajosEntity } from './trabajos.entity';
import { TrabajosController } from './trabajo.controller';
import { TrabajosService } from './trabajo.service';
import { OfertasEntity } from '../oferta/oferta.entity';
import { ProgresoTrabajoEntity } from './progreso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrabajosEntity,
      AplicacionesEntity,
      ClientesEntity,
      AbogadosEntity,
      OfertasEntity,
      ProgresoTrabajoEntity
    ]),
  ],
  controllers: [TrabajosController],
  providers: [TrabajosService],
})
export class TrabajosModule {}
