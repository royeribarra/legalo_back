import { Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import { ConductorDTO, ConductorUpdateDTO } from '../dto/conductor.dto';
import { Delete } from '@nestjs/common/decorators';
import { ConductoresService } from '../services/conductores.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('conductores')
@Controller('conductores')
export class ConductoresController {
  constructor(private readonly conductoresService: ConductoresService) {}

  @Post('register')
  public async registerConductor(@Body() body:ConductorDTO){
    return await this.conductoresService.createConductor(body);
  }

  @Get('all')
  public async findAllConductores()
  {
    return await this.conductoresService.findConductores();
  }

  @Get(':id')
  public async findConductorById(@Param('id') id: string){
    return await this.conductoresService.findConductorById(id);
  }

  @Put('edit/:id')
  public async updateConductor(@Body() body: ConductorUpdateDTO, @Param('id') id:string){
    return await this.conductoresService.updateConductor(body, id);
  }

  @Delete(':id')
  public async deleteConductor(@Param('id') id:string){
    return await this.conductoresService.deleteConductor(id);
  }

}
