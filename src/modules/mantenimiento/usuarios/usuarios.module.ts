import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosPasadoEntity } from './entities/usuarios.entity';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './controllers/usuarios.controller';
import { RolesService } from '../roles/services/roles.service';
import { RolesEntity } from '../roles/entities/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuariosPasadoEntity,
      RolesEntity
    ])
  ],
  providers: [
    UsuariosService,
    RolesService
  ],
  controllers: [
    UsuariosController
  ],
  exports: [
    UsuariosService, TypeOrmModule
  ]
})

export class UsuariosModule {}
