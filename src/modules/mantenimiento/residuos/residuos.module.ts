import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResiduosEntity } from './entities/residuos.entity';
import { ResiduosService } from './services/residuos.service';
import { ResiduosController } from './controllers/residuos.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResiduosEntity])
  ],
  providers: [
    ResiduosService
  ],
  controllers: [
    ResiduosController
  ]
})

export class ResiduosModule {}
