import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosEntity } from './usuarios.entity';
import { UsuariosService } from './usuario.service';
import { UsuariosController } from './usuario.controller';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { MailModule } from '../mail/mail.module';
import { HabilidadesBlandaEntity } from '../habilidadBlanda/habilidadesBlanda.entity';
import { HabilidadesDuraEntity } from '../habilidadDura/habilidadesDura.entity';
import { IndustriasAbogadoEntity } from '../industria/industriaAbogado.entity';
import { ServiciosAbogadoEntity } from '../servicio/servicioAbogado.entity';
import { EspecialidadesAbogadoEntity } from '../especialidad/especialidadAbogado.entity';
import { ExperienciasEntity } from '../experiencia/experiencias.entity';
import { EducacionesEntity } from '../educacion/educaciones.entity';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { InvitacionesEntity } from '../oferta/invitacion.entity';
import { FileEntity } from '../tmp/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuariosEntity,
      AbogadosEntity,
      ClientesEntity,
      HabilidadesBlandaEntity,
      HabilidadesDuraEntity,
      IndustriasAbogadoEntity,
      ServiciosAbogadoEntity,
      EspecialidadesAbogadoEntity,
      ExperienciasEntity,
      EducacionesEntity,
      AplicacionesEntity,
      TrabajosEntity,
      InvitacionesEntity,
      FileEntity
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
