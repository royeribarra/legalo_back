import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TransporteAsignadoDTO, TransporteAsignadoUpdateDTO } from '../dto/transporteAsignado.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { TransporteAsignadoEntity } from '../entities/transporteAsignado.entity';
import { SolicitudDTO } from '../../solicitudes/dto/solicitud.dto';
import { SolicitudesEntity } from '../../solicitudes/entities/solicitudes.entity';

@Injectable()
export class TransporteAsignadoService{
  constructor(
    @InjectRepository(TransporteAsignadoEntity) private readonly trackerRespository: Repository<TransporteAsignadoEntity>
  ){}

}