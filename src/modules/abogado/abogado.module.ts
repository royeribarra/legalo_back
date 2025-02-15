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
import { FileService } from '../tmp/file.service';
import { FileEntity } from '../tmp/file.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { EspecialidadesAbogadoEntity } from '../especialidad/especialidadAbogado.entity';
import { ServiciosAbogadoEntity } from '../servicio/servicioAbogado.entity';
import { IndustriasAbogadoEntity } from '../industria/industriaAbogado.entity';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { RespuestasOfertaEntity } from '../preguntas_oferta/respuestasOferta.entity';
import { PreguntasOfertaEntity } from '../preguntas_oferta/preguntasOferta.entity';

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
      IndustriasEntity,
      FileEntity,
      OfertasEntity,
      EspecialidadesAbogadoEntity,
      ServiciosAbogadoEntity,
      IndustriasAbogadoEntity,
      AplicacionesEntity,
      TrabajosEntity,
      RespuestasOfertaEntity,
      PreguntasOfertaEntity
    ]),
    UsuariosModule,
    MailModule
  ],
  providers: [
    AbogadosService,
    FileService
  ],
  controllers: [
    AbogadosController
  ]
})

export class AbogadoModule {}
