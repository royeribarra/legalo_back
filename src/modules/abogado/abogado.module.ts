import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbogadosEntity } from './entities/abogados.entity';
import { AbogadosService } from './services/abogados.service';
import { AbogadosController } from './controllers/abogado.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AbogadosEntity,
    ])
  ],
  providers: [
    AbogadosService
  ],
  controllers: [
    AbogadosController
  ]
})

export class AbogadoModule {}
