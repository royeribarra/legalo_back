import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './entities/roles.entity';
import { RolesService } from './services/roles.service';
import { RolesController } from './controllers/roles.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolesEntity])
  ],
  providers: [
    RolesService
  ],
  controllers: [
    RolesController
  ]
})

export class RolesModule {}
