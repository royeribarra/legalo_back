import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TempFilesService } from './tmpFile.service';
import { TempFilesController } from './tmp.controller';
import { TmpImageFileEntity } from './tmpImgFile.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TmpImageFileEntity,
    ]),
    MulterModule.register({
      dest: './temp',
    }),
  ],
  providers: [
    TempFilesService
  ],
  controllers: [
    TempFilesController
  ],
  exports: [
    TempFilesService, 
    TypeOrmModule
  ]
})

export class TmpModule {}
