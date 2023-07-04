import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosEntity } from './entities/usuarios.entity';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './controllers/usuarios.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuariosEntity])
  ],
  providers: [
    UsuariosService
  ],
  controllers: [
    UsuariosController
  ],
  exports: [
    UsuariosService, TypeOrmModule
  ]
})

export class UsuariosModule {}
