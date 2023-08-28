import { Body, Controller, Get, Param, Post, Put, Res} from '@nestjs/common';
import { TrackerDTO, TrackerUpdateDTO } from '../dto/tracker.dto';
import { Delete } from '@nestjs/common/decorators';
import { TrackerService } from '../services/tracker.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Tracker Solicitud')
@Controller('tracker')
export class TrackerController {
  constructor(
    private readonly trackerService: TrackerService
    ) {}

  @Post('register')
  public async registerTracker(@Body() body:TrackerDTO){
    const newDate = new Date()
    return await this.trackerService.createTracker(newDate.toLocaleDateString());
  }

  @Get('all')
  public async findAllTrackers()
  {
    return await this.trackerService.findTrackers();
  }

  @Get(':id')
  public async findTrackerById(@Param('id') id: number){
    return await this.trackerService.findTrackerById(id);
  }

  @Put('edit/:id')
  public async updateTracker(@Body() body: TrackerUpdateDTO, @Param('id') id:number){
    return await this.trackerService.updateTracker(body, id);
  }

  @Delete(':id')
  public async deleteTracker(@Param('id') id:string){
    return await this.trackerService.deleteTracker(id);
  }

}
