import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculosEntity } from './entities/vehiculo.entity';
import { VehiculosService } from './services/vehiculos.service';
import { VehiculosController } from './controllers/vehiculos.controller';
import { TipoVehiculoService } from './services/tipoVehiculo.service';
import { TipoVehiculoEntity } from './entities/tipoVehiculo.entity';
import { TipoVehiculoController } from './controllers/tipoVehiculo.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VehiculosEntity, TipoVehiculoEntity
    ])
  ],
  providers: [
    VehiculosService,
    TipoVehiculoService
  ],
  controllers: [
    VehiculosController,
    TipoVehiculoController
  ]
})

export class VehiculosModule {}
