import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TrackerDTO, TrackerUpdateDTO } from '../dto/tracker.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { TrackerEntity } from '../entities/tracker.entity';
import { SolicitudesEntity } from '../../solicitudes/entities/solicitudes.entity';
import { EtapaTrackerEntity } from '../entities/etapaTracker.entity';
import { EtapaTrackerDTO } from '../dto/etapaTracker.dto';

@Injectable()
export class EtapaTrackerService{
  constructor(
    @InjectRepository(EtapaTrackerEntity) private readonly etapaRepository: Repository<EtapaTrackerEntity>,
  ){}

  public async createEtapaTracker(tracker: TrackerEntity)
  {
    const newEtapa : EtapaTrackerDTO = {
      nombre: "Asignado",
      descripcion: "Se asignará un vehículo de transporte para ",
      estado: "Pendiente",
      fechaInicio: tracker.fechaInicio,
      fechaFinalizacion: "tracker.fechaCompletado",
      responsable: "tracker.responsable.nombre",
      trackerId: tracker.id
    };

    const etapaEntity= {...newEtapa, tracker: tracker};
    try {

      const etapaTracker : EtapaTrackerEntity = await this.etapaRepository.save(etapaEntity);

      if(!etapaTracker){
        return {
          state: false,
          message: "No se pudo crear la etapa del tracker",
          etapaTracker: etapaTracker
        };
      }
      
      return {
        state: true,
        message: "Etapa creada correctamente",
        etapaTracker: etapaTracker
      };

    } catch (error) {
      console.log("etapaTrackerService L-56", error)
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async createSegundaEtapaTracker(tracker: TrackerEntity)
  {
    const newEtapa : EtapaTrackerDTO = {
      nombre: "En camino",
      descripcion: "El vehículo ya fue asignado y saldrá el día especificado.",
      estado: "Pendiente",
      fechaInicio: tracker.fechaInicio,
      fechaFinalizacion: "segunda etapa",
      responsable: "segunda etapa",
      trackerId: tracker.id
    };

    const etapaEntity= {...newEtapa, tracker: tracker};
    try {

      const etapaTracker : EtapaTrackerEntity = await this.etapaRepository.save(etapaEntity);

      if(!etapaTracker){
        return {
          state: false,
          message: "No se pudo crear la etapa del tracker",
          etapaTracker: etapaTracker
        };
      }
      
      return {
        state: true,
        message: "Etapa creada correctamente",
        etapaTracker: etapaTracker
      };

    } catch (error) {
      console.log("etapaTrackerService L-86", error)
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  
  public async findEtapas(queryParams): Promise<EtapaTrackerEntity[]>
  {
    const query = this.etapaRepository.createQueryBuilder('etapas')
      .leftJoinAndSelect('etapas.tracker', 'tracker');

    if (queryParams.trackerId) {
      query.andWhere('tracker.id = :trackerId', { trackerId: queryParams.trackerId })
    }

    try {
      const etapas: EtapaTrackerEntity[] = await query.getMany();

      return etapas;
      
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateEtapaTracker(body, id: number)
  {
    try {
      const etapaTracker: UpdateResult = await this.etapaRepository.update(id, body);
      if(etapaTracker.affected === 0)
      {
        return {
          state: false,
          message: "No se pudo actualizar la etapa del tracker",
          etapaTracker: etapaTracker
        };
      }
      return {
        state: true,
        message: "Etapa actualizada correctamente",
        etapaTracker: etapaTracker
      };
    } catch (error) {
      console.log("etapaTrackerService Ln-91", error)
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}