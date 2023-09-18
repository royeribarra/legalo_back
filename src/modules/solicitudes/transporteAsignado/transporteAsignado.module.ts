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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransporteAsignadoEntity,
      SolicitudesEntity,
      VehiculosEntity
    ])
  ],
  providers: [
    TransporteAsignadoService,
    VehiculosService
  ],
  controllers: [
    TransporteAsignadoController
  ]
})

export class TransporteAsignadoModule {}