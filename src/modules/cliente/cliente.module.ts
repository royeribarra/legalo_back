import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesEntity } from './entities/clientes.entity';
import { ClienteService } from './services/clientes.service';
import { ClienteController } from './controllers/cliente.controller';
import { EducacionesEntity } from '../educacion/educaciones.entity';
import { EspecialidadesEntity } from '../especialidad/especialidades.entity';
import { ExperienciasEntity } from '../experiencia/experiencias.entity';
import { HabilidadesDuraEntity } from '../habilidadDura/habilidadesDura.entity';
import { HabilidadesBlandaEntity } from '../habilidadBlanda/habilidadesBlanda.entity';
import { ServiciosEntity } from '../servicio/servicios.entity';
import { IndustriasEntity } from '../industria/industrias.entity';
import { UsuariosModule } from '../usuario/usuario.module';
import { MailModule } from '../mail/mail.module';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { FileEntity } from '../tmp/file.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientesEntity,
      EducacionesEntity,
      EspecialidadesEntity,
      ExperienciasEntity,
      HabilidadesDuraEntity,
      HabilidadesBlandaEntity,
      ServiciosEntity,
      IndustriasEntity,
      TrabajosEntity,
      OfertasEntity,
      FileEntity,
      AbogadosEntity
    ]),
    UsuariosModule,
    MailModule
  ],
  providers: [
    ClienteService
  ],
  controllers: [
    ClienteController
  ]
})

export class ClienteModule {}
