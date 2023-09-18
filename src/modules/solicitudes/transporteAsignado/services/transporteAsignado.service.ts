import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TransporteAsignadoDTO, TransporteAsignadoUpdateDTO } from '../dto/transporteAsignado.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { TransporteAsignadoEntity } from '../entities/transporteAsignado.entity';
import { SolicitudesService } from '../../solicitudes/services/solicitudes.service';
import { VehiculosService } from '../../../mantenimiento/vehiculos/services/vehiculos.service';
import { SolicitudesEntity } from '../../solicitudes/entities/solicitudes.entity';

@Injectable()
export class TransporteAsignadoService{
  constructor(
    @InjectRepository(TransporteAsignadoEntity) private readonly asignacionRepository: Repository<TransporteAsignadoEntity>,
    @InjectRepository(SolicitudesEntity) private readonly serviceRepository: Repository<SolicitudesEntity>,
    private readonly vehiculoService: VehiculosService,
  ){}

  public async createAsignacion(body: any)
  {
    const solicitud = await this.serviceRepository
      .createQueryBuilder('solicitudes')
      .where('solicitudes.id = :id', {id: body.solicitudId})
      .getOne();
    console.log(body)
    const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);
    
    const newBody = {
      ...new TransporteAsignadoEntity(),
      vehiculo,
      solicitud: solicitud,
      fechaRecoleccion: solicitud.fechaRecoleccion
    };

    try {
      const newAsignacion : TransporteAsignadoEntity = await this.asignacionRepository.save(newBody);

      return {
        state: true,
        message: "Se creó la asignación correctamente.",
        solicitud: newAsignacion
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async asignarCantidadRecibida(body: any)
  {
    const solicitud = await this.serviceRepository
      .createQueryBuilder('solicitudes')
      .where('solicitudes.id = :id', {id: body.solicitudId})
      .getOne();
      
    const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);
    
    const newBody = {
      ...new TransporteAsignadoEntity(),
      vehiculo,
      solicitud: solicitud,
      fechaRecoleccion: solicitud.fechaRecoleccion
    };

    try {
      const newAsignacion : TransporteAsignadoEntity = await this.asignacionRepository.save(newBody);

      return {
        state: true,
        message: "Se creó la asignación correctamente.",
        solicitud: newAsignacion
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}