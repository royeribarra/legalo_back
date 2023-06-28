import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculosEntity } from './entities/vehiculo.entity';
import { VehiculosService } from './services/vehiculos.service';
import { VehiculosController } from './controllers/vehiculos.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehiculosEntity])
  ],
  providers: [
    VehiculosService
  ],
  controllers: [
    VehiculosController
  ]
})

export class VehiculosModule {}
