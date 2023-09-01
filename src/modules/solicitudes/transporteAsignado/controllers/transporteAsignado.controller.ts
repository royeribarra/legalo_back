import { Body, Controller, Get, Param, Post, Put, Res} from '@nestjs/common';
import { TransporteAsignadoDTO, TransporteAsignadoUpdateDTO } from '../dto/transporteAsignado.dto';
import { Delete } from '@nestjs/common/decorators';
import { TransporteAsignadoService } from '../services/transporteAsignado.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Transporte Asignado')
@Controller('transporte-asignado')
export class TransporteAsignadoController {
  constructor(
    private readonly trackerService: TransporteAsignadoService
    ) {}

  

}
