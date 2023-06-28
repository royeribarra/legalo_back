import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudesEntity } from './entities/solicitudes.entity';
import { SolicitudesService } from './services/solicitudes.service';
import { SolicitudesController } from './controllers/solicitudes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitudesEntity])
  ],
  providers: [
    SolicitudesService
  ],
  controllers: [
    SolicitudesController
  ]
})

export class SolicitudesModule {}
