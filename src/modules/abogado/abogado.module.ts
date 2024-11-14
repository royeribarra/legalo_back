import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbogadosEntity } from './entities/abogados.entity';
import { AbogadosService } from './services/abogados.service';
import { AbogadosController } from './controllers/abogado.controller';
import { EducacionesEntity } from '../educacion/educaciones.entity';
import { EspecialidadesEntity } from '../especialidad/especialidades.entity';
import { ExperienciasEntity } from '../experiencia/experiencias.entity';
import { HabilidadesDuraEntity } from '../habilidadDura/habilidadesDura.entity';
import { HabilidadesBlandaEntity } from '../habilidadBlanda/habilidadesBlanda.entity';
import { ServiciosEntity } from '../servicio/servicios.entity';
import { IndustriasEntity } from '../industria/industrias.entity';
import { UsuariosModule } from '../usuario/usuario.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AbogadosEntity,
      EducacionesEntity,
      EspecialidadesEntity,
      ExperienciasEntity,
      HabilidadesDuraEntity,
      HabilidadesBlandaEntity,
      ServiciosEntity,
      IndustriasEntity
    ]),
    UsuariosModule,
    MailModule
  ],
  providers: [
    AbogadosService
  ],
  controllers: [
    AbogadosController
  ]
})

export class AbogadoModule {}
