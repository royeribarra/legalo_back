import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosEntity } from './usuarios.entity';
import { UsuariosService } from './usuario.service';
import { UsuariosController } from './usuario.controller';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuariosEntity,
      AbogadosEntity,
      ClientesEntity
    ]),
    MailModule
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
