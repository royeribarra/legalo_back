import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductoresEntity } from './entities/conductores.entity';
import { ConductoresService } from './services/conductores.service';
import { ConductoresController } from './controllers/conductores.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConductoresEntity])
  ],
  providers: [
    ConductoresService
  ],
  controllers: [
    ConductoresController
  ]
})

export class ConductoresModule {}
