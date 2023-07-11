import { Body, Controller, Get, Param, Post, Put, Res} from '@nestjs/common';
import { TrackerDTO, TrackerUpdateDTO } from '../dto/tracker.dto';
import { Delete } from '@nestjs/common/decorators';
import { TrackerService } from '../services/tracker.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('tracker')
@Controller('tracker')
export class TrackerController {
  constructor(
    private readonly trackerService: TrackerService
    ) {}

  @Post('register')
  public async registerCliente(@Body() body:TrackerDTO){
    const newDate = new Date()
    return await this.trackerService.createTracker(newDate.toLocaleDateString());
  }

  @Get('all')
  public async findAllClientes()
  {
    return await this.trackerService.findClientes();
  }

  @Get(':id')
  public async findClienteById(@Param('id') id: string){
    return await this.trackerService.findClienteById(id);
  }

  @Put('edit/:id')
  public async updateCliente(@Body() body: TrackerUpdateDTO, @Param('id') id:string){
    return await this.trackerService.updateCliente(body, id);
  }

  @Delete(':id')
  public async deleteCliente(@Param('id') id:string){
    return await this.trackerService.deleteCliente(id);
  }

}
