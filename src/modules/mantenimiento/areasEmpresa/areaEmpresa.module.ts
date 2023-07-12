import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaEmpresaEntity } from './entities/areasEmpresa.entity';
import { AreaEmpresaService } from './services/areaEmpresa.service';
import { AreaEmpresaController } from './controllers/areaEmpresa.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AreaEmpresaEntity])
  ],
  providers: [
    AreaEmpresaService
  ],
  controllers: [
    AreaEmpresaController
  ]
})

export class AreaEmpresaModule {}
