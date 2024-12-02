// src/trabajos/trabajos.module.ts
import { Module } from '@nestjs/common';
import { TrabajosController } from './controllers/trabajos.controller';
import { TrabajosService } from './services/trabajos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrabajosEntity } from './entities/trabajos.entity';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrabajosEntity, AplicacionesEntity, ClientesEntity, AbogadosEntity]),
  ],
  controllers: [TrabajosController],
  providers: [TrabajosService],
})
export class TrabajosModule {}
