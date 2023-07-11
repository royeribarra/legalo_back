import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudesEntity } from './entities/solicitudes.entity';
import { SolicitudesService } from './services/solicitudes.service';
import { SolicitudesController } from './controllers/solicitudes.controller';
import { MailModule } from '../../../modules/mail/mail.module';
import { TrackerEntity } from '../tracker/entities/tracker.entity';
import { TrackerService } from '../tracker/services/tracker.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitudesEntity, TrackerEntity]),
    MailModule
  ],
  providers: [
    SolicitudesService, TrackerService
  ],
  controllers: [
    SolicitudesController
  ]
})

export class SolicitudesModule {}
