import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducacionesEntity } from '../educacion/educaciones.entity';
import { EspecialidadesEntity } from '../especialidad/especialidades.entity';
import { ExperienciasEntity } from '../experiencia/experiencias.entity';
import { HabilidadesDuraEntity } from '../habilidadDura/habilidadesDura.entity';
import { HabilidadesBlandaEntity } from '../habilidadBlanda/habilidadesBlanda.entity';
import { ServiciosEntity } from '../servicio/servicios.entity';
import { IndustriasEntity } from '../industria/industrias.entity';
import { UsuariosModule } from '../usuario/usuario.module';
import { MailModule } from '../mail/mail.module';
import { TempFilesService } from '../tmp/tmpFile.service';
import { TmpImageFileEntity } from '../tmp/tmpImgFile.entity';
import { OfertasEntity } from './oferta.entity';
import { OfertaService } from './oferta.service';
import { OfertaController } from './oferta.controller';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { PreguntasOfertaEntity } from '../preguntas_oferta/preguntasOferta.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { InvitacionesEntity } from './invitacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OfertasEntity,
      EducacionesEntity,
      EspecialidadesEntity,
      ExperienciasEntity,
      HabilidadesDuraEntity,
      HabilidadesBlandaEntity,
      ServiciosEntity,
      IndustriasEntity,
      TmpImageFileEntity,
      AplicacionesEntity,
      TrabajosEntity,
      PreguntasOfertaEntity,
      AbogadosEntity,
      InvitacionesEntity
    ]),
    UsuariosModule,
    MailModule
  ],
  providers: [
    OfertaService,
    TempFilesService
  ],
  controllers: [
    OfertaController
  ]
})

export class OfertaModule {}
