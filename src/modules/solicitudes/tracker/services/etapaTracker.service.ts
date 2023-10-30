import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from '../../../../utils/error.manager';
import { TrackerEntity } from '../entities/tracker.entity';
import { EtapaTrackerEntity } from '../entities/etapaTracker.entity';
import { EtapaTrackerDTO } from '../dto/etapaTracker.dto';

@Injectable()
export class EtapaTrackerService{
  constructor(
    @InjectRepository(EtapaTrackerEntity) private readonly etapaRepository: Repository<EtapaTrackerEntity>,
  ){}

  etapas = [
    {
      id: 1,
      nombre: "Solicitud registrada",
      descripcion: "Se asignará un vehículo de transporte para ",
      estado: "Pendiente",
      fechaFinalizacion: "tracker.fechaCompletado",
      responsable: "tracker.responsable.nombre",
    },
    {
      id: 2,
      nombre: "Solicitud reprogramada",
      descripcion: "Se asignará un vehículo de transporte para ",
      estado: "Pendiente",
      fechaFinalizacion: "tracker.fechaCompletado",
      responsable: "tracker.responsable.nombre",
    },
    {
      id: 3,
      nombre: "Vehículo asignado",
      descripcion: "Se asignó el vehículo que recojerá el residuo.",
      estado: "Finalizado",
      fechaFinalizacion: "tracker.fechaCompletado",
      responsable: "tracker.responsable.nombre",
    },
    {
      id: 4,
      nombre: "Transportista asignado",
      descripcion: "Se asignó al transportista responsable.",
      estado: "Finalizado",
      fechaFinalizacion: "tracker.fechaCompletado",
      responsable: "tracker.responsable.nombre",
    },
    {
      id: 5,
      nombre: "En camino a recojo",
      descripcion: "El transporte se dirige hacia el local.",
      estado: "Pendiente",
      fechaFinalizacion: "tracker.fechaCompletado",
      responsable: "tracker.responsable.nombre",
    },
    {
      id: 6,
      nombre: "Recolección en proceso",
      descripcion: "El equipo de transporte se encuentra en el proceso de recolección.",
      estado: "Pendiente",
      fechaFinalizacion: "tracker.fechaCompletado",
      responsable: "tracker.responsable.nombre",
    },
    {
      id: 7,
      nombre: "En camino a entrega a planta",
      descripcion: "El transporte está en camino a planta",
      estado: "Pendiente",
      fechaFinalizacion: "tracker.fechaCompletado",
      responsable: "tracker.responsable.nombre",
    },
    {
      id: 8,
      nombre: "Residuos entregados a planta",
      descripcion: "Se asignará un vehículo de transporte para ",
      estado: "Pendiente",
      fechaFinalizacion: "tracker.fechaCompletado",
      responsable: "tracker.responsable.nombre",
    },
    {
      id: 9,
      nombre: "Evaluación de residuos en recepción",
      descripcion: "Se asignará un vehículo de transporte para ",
      estado: "Pendiente",
      fechaFinalizacion: "tracker.fechaCompletado",
      responsable: "tracker.responsable.nombre",
    },
    {
      id: 10,
      nombre: "Certificado de manifiesto",
      descripcion: "Se asignará un vehículo de transporte para ",
      estado: "Pendiente",
      fechaFinalizacion: "tracker.fechaCompletado",
      responsable: "tracker.responsable.nombre",
    },
    {
      id: 11,
      nombre: "Pago programado",
      descripcion: "Se asignará un vehículo de transporte para ",
      estado: "Pendiente",
      fechaFinalizacion: "tracker.fechaCompletado",
      responsable: "tracker.responsable.nombre",
    },
    {
      id: 12,
      nombre: "Pagado",
      descripcion: "Se asignará un vehículo de transporte para ",
      estado: "Pendiente",
      fechaFinalizacion: "tracker.fechaCompletado",
      responsable: "tracker.responsable.nombre",
    }
  ]

  public async createEtapaTracker(tracker: TrackerEntity, etapaNumber: number)
  {
    const newEtapa = this.etapas.find((etapa)=>etapa.id === etapaNumber);
   
    const etapaEntity= {
      ...newEtapa, 
      tracker: tracker,
    };

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
      console.log("etapaTrackerService-createEtapaTracker", error)
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

  public async createTerceraEtapaTracker(tracker: TrackerEntity)
  {
    const newEtapa : EtapaTrackerDTO = {
      nombre: "Recogido",
      descripcion: "El material ya fue recogido del local.",
      estado: "Pendiente",
      fechaInicio: tracker.fechaInicio,
      fechaFinalizacion: "tercera etapa",
      responsable: "tercera etapa",
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
      console.log("etapaTrackerService L-123", error)
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