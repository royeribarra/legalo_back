import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TransporteAsignadoDTO, TransporteAsignadoUpdateDTO } from '../dto/transporteAsignado.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { TransporteAsignadoEntity } from '../entities/transporteAsignado.entity';
import { VehiculosService } from '../../../mantenimiento/vehiculos/services/vehiculos.service';
import { SolicitudesEntity } from '../../solicitudes/entities/solicitudes.entity';
import { ConductoresService } from 'src/modules/mantenimiento/conductores/services/conductores.service';

@Injectable()
export class TransporteAsignadoService{
  constructor(
    @InjectRepository(TransporteAsignadoEntity) private readonly asignacionRepository: Repository<TransporteAsignadoEntity>,
    @InjectRepository(SolicitudesEntity) private readonly serviceRepository: Repository<SolicitudesEntity>,
    private readonly vehiculoService: VehiculosService,
    private readonly conductorService: ConductoresService,
  ){}

  public async createAsignacion(body: any)
  {
    const solicitud = await this.serviceRepository
      .createQueryBuilder('solicitud')
      .leftJoinAndSelect('solicitud.residuosRecojo', 'residuosRecojo')
      .where('solicitud.id = :id', {id: body.solicitudId})
      .getOne();
    const vehiculo = await this.vehiculoService.findVehiculoById(body.vehiculoId);
    
    const cantidadGlobal = solicitud.residuosRecojo.reduce((suma, residuo) => suma + residuo.cantidadUniversal, 0);

    const newBody = {
      ...new TransporteAsignadoEntity(),
      vehiculo,
      solicitud: solicitud,
      fechaRecoleccion: solicitud.fechaRecoleccion,
      cantidadTotalUsada: cantidadGlobal
    };

    try {
      const newAsignacion : TransporteAsignadoEntity = await this.asignacionRepository.save(newBody);

      return {
        state: true,
        message: "Se creó la asignación correctamente.",
        asignacionTransporte: newAsignacion
      };
    } catch (error) {
      console.log(error, "error en transporteAsignadoService-createAsignacion")
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateTransporteAsignado(body: any, id: number)
  {
    const conductor = await this.conductorService.findConductorById(body.conductorId);
    const supervisor = await this.conductorService.findConductorById(body.supervisorId); 
    const newBody = {
      ...new TransporteAsignadoEntity(),
      conductor: conductor,
      conductorSupervisor: supervisor
    };
    
    try {
      const vehiculo: UpdateResult = await this.asignacionRepository.update(id, newBody);
      
      return {
        state: true,
        message: "Se actualizó la asignación correctamente."
      };
    } catch (error) {
      console.log(error, "error en transporteAsignadoService-updateAsignacion")
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

  public async obtenerTodos(queryParams): Promise<TransporteAsignadoEntity[]>
  {
    const query = this.asignacionRepository.createQueryBuilder('asignaciones')
                  .leftJoinAndSelect('asignaciones.vehiculo', 'vehiculo');

    if (queryParams.startDate && queryParams.endDate) 
    {
      const startDate = queryParams.startDate;
      const endDate = queryParams.endDate;
      query.where('asignaciones.fechaRecoleccion BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    try {
      const vehiculos: TransporteAsignadoEntity[] = await query.getMany();
      
      return vehiculos;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}