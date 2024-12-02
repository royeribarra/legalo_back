import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustriasEntity } from './industrias.entity';
import { IndustriasAbogadoEntity } from './industriaAbogado.entity';
import { IndustriasOfertaEntity } from './industriaOferta.entity';
import { IndustriaController } from './industria.controller';
import { IndustriaService } from './industria.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IndustriasEntity,
      IndustriasAbogadoEntity,
      IndustriasOfertaEntity,
    ]),
  ],
  providers: [
    IndustriaService
  ],
  controllers: [
    IndustriaController
  ]
})

export class IndustriaModule {}
