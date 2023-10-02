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
import { ConductoresService } from '../../mantenimiento/conductores/services/conductores.service';
import { ConductoresEntity } from '../../mantenimiento/conductores/entities/conductores.entity';
import { TiposResiduoService } from '../../mantenimiento/tiposResiduo/services/tiposResiduo.service';
import { TiposResiduoEntity } from '../../mantenimiento/tiposResiduo/entities/tiposResiduo.entity';
import { TransporteAsignadoService } from '../transporteAsignado/services/transporteAsignado.service';
import { TransporteAsignadoEntity } from '../transporteAsignado/entities/transporteAsignado.entity';
import { CalidadMailService } from 'src/modules/mail/services/calidadMail.service';
import { UnidadMedidaResiduoService } from 'src/modules/mantenimiento/tiposResiduo/services/unidadesMedidaResiduo.service';
import { UnidadesMedidaResiduoEntity } from 'src/modules/mantenimiento/tiposResiduo/entities/unidadesMedidaResiduo.entity';
import { TipoResiduoUnidadMedidaService } from 'src/modules/mantenimiento/tiposResiduo/services/tipoResiduoUnidadMedida.service';
import { TiposResiduoUnidadMedidaEntity } from 'src/modules/mantenimiento/tiposResiduo/entities/tiposResiduoUnidadMedida.entity';

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
      TipoVehiculoEntity,
      ConductoresEntity,
      TiposResiduoEntity,
      TransporteAsignadoEntity,
      UnidadesMedidaResiduoEntity,
      TiposResiduoUnidadMedidaEntity
    ]),
    MailModule
  ],
  providers: [
    ClienteMailService,
    CalidadMailService,
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
    TipoVehiculoService,
    ConductoresService,
    TiposResiduoService,
    TransporteAsignadoService,
    UnidadMedidaResiduoService,
    TipoResiduoUnidadMedidaService
  ],
  controllers: [
    SolicitudesController
  ]
})

export class SolicitudesModule {}
