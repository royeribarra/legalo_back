import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaEmpresaEntity } from './entities/areasEmpresa.entity';
import { AreaEmpresaService } from './services/areaEmpresa.service';
import { AreaEmpresaController } from './controllers/areaEmpresa.controller';
import { UsuariosService } from '../usuarios/services/usuarios.service';
import { UsuariosPasadoEntity } from '../usuarios/entities/usuarios.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AreaEmpresaEntity,
      UsuariosPasadoEntity
    ])
  ],
  providers: [
    AreaEmpresaService,
    UsuariosService
  ],
  controllers: [
    AreaEmpresaController
  ]
})

export class AreaEmpresaModule {}
