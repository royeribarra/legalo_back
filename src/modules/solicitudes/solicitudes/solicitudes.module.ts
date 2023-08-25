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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SolicitudesEntity, 
      TrackerEntity,
      ResiduosRecojoEntity,
      ClientesEntity,
      SucursalesClienteEntity,
      UsuariosEntity
    ]),
    MailModule
  ],
  providers: [
    SolicitudesService, 
    TrackerService,
    ResiduosRecojoService,
    ClienteMailService,
    ComercialMailService,
    ClientesService,
    SucursalesClienteService,
    UsuariosService
  ],
  controllers: [
    SolicitudesController
  ]
})

export class SolicitudesModule {}
