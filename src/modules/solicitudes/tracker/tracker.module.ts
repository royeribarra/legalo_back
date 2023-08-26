import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackerEntity } from './entities/tracker.entity';
import { TrackerService } from './services/tracker.service';
import { TrackerController } from './controllers/tracker.controller';
import { EtapaTrackerService } from './services/etapaTracker.service';
import { EtapaTrackerEntity } from './entities/etapaTracker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrackerEntity,
      EtapaTrackerEntity
    ])
  ],
  providers: [
    TrackerService,
    EtapaTrackerService
  ],
  controllers: [
    TrackerController
  ]
})

export class TrackerModule {}
