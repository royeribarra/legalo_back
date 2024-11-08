import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosEntity } from './usuarios.entity';
import { UsuariosService } from './usuario.service';
import { UsuariosController } from './usuario.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuariosEntity,
    ])
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
