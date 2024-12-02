import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialidadesEntity } from './especialidades.entity';
import { EspecialidadesAbogadoEntity } from './especialidadAbogado.entity';
import { EspecialidadesOfertaEntity } from './especialidadOferta.entity';
import { EspecialidadController } from './especialidad.controller';
import { EspecialidadService } from './especialidad.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EspecialidadesEntity,
      EspecialidadesAbogadoEntity,
      EspecialidadesOfertaEntity
    ]),
  ],
  providers: [
    EspecialidadService
  ],
  controllers: [
    EspecialidadController
  ]
})

export class EspecialidadModule {}
