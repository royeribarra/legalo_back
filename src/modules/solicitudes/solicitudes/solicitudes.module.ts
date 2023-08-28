import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudesEntity } from './entities/solicitudes.entity';
import { SolicitudesService } from './services/solicitudes.service';
import { SolicitudesController } from './controllers/solicitudes.controller';
import { MailModule } from '../../../modules/mail/mail.module';
import { TrackerEntity } from '../tracker/entities/tracker.entity';
import { TrackerService } from '../tracker/services/tracker.service';
import { ResiduosRecojoService } from '../residuosRecojo/services/residuosRecojo.service';
import { ResiduosRecojoEntity } from '../residuosRecojo/entities/residuosRecojo.entity';
import { ClienteMailService } from '../../mail/services/clienteMail.service';
import { ComercialMailService } from '../../mail/services/comercialMail.service';
import { ClientesService } from '../clientes/services/clientes.service';
import { SucursalesClienteService } from '../sucursalesCliente/services/sucursalesCliente.service';
import { ClientesEntity } from '../clientes/entities/clientes.entity';
import { SucursalesClienteEntity } from '../sucursalesCliente/entities/sucursalesCliente.entity';
import { UsuariosService } from '../../mantenimiento/usuarios/services/usuarios.service';
import { UsuariosEntity } from '../../mantenimiento/usuarios/entities/usuarios.entity';
import { EtapaTrackerService } from '../tracker/services/etapaTracker.service';
import { EtapaTrackerEntity } from '../tracker/entities/etapaTracker.entity';
import { VehiculosService } from '../../mantenimiento/vehiculos/services/vehiculos.service';
import { VehiculosEntity } from '../../mantenimiento/vehiculos/entities/vehiculo.entity';
import { TipoVehiculoService } from '../../mantenimiento/vehiculos/services/tipoVehiculo.service';
import { TipoVehiculoEntity } from '../../mantenimiento/vehiculos/entities/tipoVehiculo.entity';
import { TransporteMailService } from '../../mail/services/transporteMail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SolicitudesEntity, 
      TrackerEntity,
      ResiduosRecojoEntity,
      ClientesEntity,
      SucursalesClienteEntity,
      UsuariosEntity,
      EtapaTrackerEntity,
      VehiculosEntity,
      TipoVehiculoEntity
    ]),
    MailModule
  ],
  providers: [
    ClienteMailService,
    TransporteMailService,
    SolicitudesService, 
    TrackerService,
    ResiduosRecojoService,
    ComercialMailService,
    ClientesService,
    SucursalesClienteService,
    UsuariosService,
    EtapaTrackerService,
    VehiculosService,
    TipoVehiculoService
  ],
  controllers: [
    SolicitudesController
  ]
})

export class SolicitudesModule {}
