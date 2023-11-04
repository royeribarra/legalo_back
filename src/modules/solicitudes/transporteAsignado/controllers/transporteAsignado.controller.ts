import { Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import { TransporteAsignadoDTO, TransporteAsignadoUpdateDTO } from '../dto/transporteAsignado.dto';
import { Delete } from '@nestjs/common/decorators';
import { TransporteAsignadoService } from '../services/transporteAsignado.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Transporte Asignado')
@Controller('transporte-asignado')
export class TransporteAsignadoController {
  constructor(
    private readonly transporteAsignadoService: TransporteAsignadoService
    ) {}

    @Get('all')
    public async findAllVehiculos(@Query() queryParams: any)
    {
      console.log("url", queryParams)
      return await this.transporteAsignadoService.obtenerTodos(queryParams);
    }
}