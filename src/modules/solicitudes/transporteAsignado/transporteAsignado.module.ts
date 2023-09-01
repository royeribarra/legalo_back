import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransporteAsignadoEntity } from './entities/transporteAsignado.entity';
import { TransporteAsignadoService } from './services/transporteAsignado.service';
import { TransporteAsignadoController } from './controllers/transporteAsignado.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransporteAsignadoEntity
    ])
  ],
  providers: [
    TransporteAsignadoService
  ],
  controllers: [
    TransporteAsignadoController
  ]
})

export class TransporteAsignadoModule {}