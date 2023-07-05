import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackerEntity } from './entities/tracker.entity';
import { TrackerService } from './services/tracker.service';
import { TrackerController } from './controllers/tracker.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrackerEntity,
    ])
  ],
  providers: [
    TrackerService,
  ],
  controllers: [
    TrackerController
  ]
})

export class TrackerModule {}
