import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilesEntity } from './perfiles.entity';
import { PerfilesService } from './perfiles.services';
import { PerfilesController } from './perfil.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PerfilesEntity])
  ],
  providers: [
    PerfilesService
  ],
  controllers: [
    PerfilesController
  ]
})

export class RolesModule {}
