import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculosEntity } from './entities/vehiculo.entity';
import { VehiculosService } from './services/vehiculos.service';
import { VehiculosController } from './controllers/vehiculos.controller';
import { TipoVehiculoService } from './services/tipoVehiculo.service';
import { TipoVehiculoEntity } from './entities/tipoVehiculo.entity';
import { TipoVehiculoController } from './controllers/TipoVehiculo.controller';
import { UsuariosService } from '../usuarios/services/usuarios.service';
import { UsuariosPasadoEntity } from '../usuarios/entities/usuarios.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VehiculosEntity, 
      TipoVehiculoEntity,
      UsuariosPasadoEntity
    ])
  ],
  providers: [
    UsuariosService,
    VehiculosService,
    TipoVehiculoService
  ],
  controllers: [
    VehiculosController,
    TipoVehiculoController
  ]
})

export class VehiculosModule {}
