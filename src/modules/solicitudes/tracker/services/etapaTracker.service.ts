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
    @InjectRepository(EtapaTrackerEntity) private readonly etapaRespository: Repository<EtapaTrackerEntity>,
  ){}

  etapas = [
    {
      id: "Etapa 1",

    }
  ];

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

      const etapaTracker : EtapaTrackerEntity = await this.etapaRespository.save(etapaEntity);

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
}