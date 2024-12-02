import { Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EspecialidadService } from './especialidad.service';

@ApiTags('Especialidades')
@Controller('especialidades')
export class EspecialidadController {
  constructor(
    private readonly especialidadService: EspecialidadService,
    ) {}

  @Get('all')
  public async findAllEspecialidades(@Query() queryParams: any)
  {
    return await this.especialidadService.findEspecialidades(queryParams);
  }

  @Get(':id')
  public async findEspecialidadById(@Param('id') id: number){
    return await this.especialidadService.findEspecialidadById(id);
  }
}