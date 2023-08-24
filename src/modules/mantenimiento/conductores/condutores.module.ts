import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductoresEntity } from './entities/conductores.entity';
import { ConductoresService } from './services/conductores.service';
import { ConductoresController } from './controllers/conductores.controller';
import { VehiculosEntity } from '../vehiculos/entities/vehiculo.entity';
import { VehiculosService } from '../vehiculos/services/vehiculos.service';
import { TipoVehiculoService } from '../vehiculos/services/tipoVehiculo.service';
import { TipoVehiculoEntity } from '../vehiculos/entities/tipoVehiculo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConductoresEntity,
      VehiculosEntity,
      TipoVehiculoEntity
    ])
  ],
  providers: [
    ConductoresService,
    VehiculosService,
    TipoVehiculoService
  ],
  controllers: [
    ConductoresController
  ]
})

export class ConductoresModule {}
