import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResiduosRecojoService } from './services/residuosRecojo.service';
import { ResiduosRecojoEntity } from './entities/residuosRecojo.entity';
import { ResiduosRecojoController } from './controllers/residuosRecojo.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResiduosRecojoEntity
    ])
  ],
  providers: [
    ResiduosRecojoService,
  ],
  controllers: [
    ResiduosRecojoController,
  ]
})

export class ResiduosRecojoModule {}
