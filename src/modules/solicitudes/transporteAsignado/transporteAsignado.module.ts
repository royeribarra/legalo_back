import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransporteAsignadoEntity } from './entities/transporteAsignado.entity';
import { TransporteAsignadoService } from './services/transporteAsignado.service';
import { TransporteAsignadoController } from './controllers/transporteAsignado.controller';
import { SolicitudesService } from '../solicitudes/services/solicitudes.service';
import { SolicitudesEntity } from '../solicitudes/entities/solicitudes.entity';
import { VehiculosService } from '../../mantenimiento/vehiculos/services/vehiculos.service';
import { VehiculosEntity } from '../../mantenimiento/vehiculos/entities/vehiculo.entity';
import { SolicitudesModule } from '../solicitudes/solicitudes.module';
import { ConductoresService } from 'src/modules/mantenimiento/conductores/services/conductores.service';
import { ConductoresEntity } from 'src/modules/mantenimiento/conductores/entities/conductores.entity';
import { TipoVehiculoService } from 'src/modules/mantenimiento/vehiculos/services/tipoVehiculo.service';
import { TipoVehiculoEntity } from 'src/modules/mantenimiento/vehiculos/entities/tipoVehiculo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransporteAsignadoEntity,
      SolicitudesEntity,
      VehiculosEntity,
      ConductoresEntity,
      TipoVehiculoEntity
    ])
  ],
  providers: [
    TransporteAsignadoService,
    VehiculosService,
    ConductoresService,
    TipoVehiculoService
  ],
  controllers: [
    TransporteAsignadoController
  ]
})

export class TransporteAsignadoModule {}