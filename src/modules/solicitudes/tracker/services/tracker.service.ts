import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TrackerDTO, TrackerUpdateDTO } from '../dto/tracker.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { TrackerEntity } from '../entities/tracker.entity';
import { SolicitudesEntity } from '../../solicitudes/entities/solicitudes.entity';
import { EtapaTrackerService } from './etapaTracker.service';

@Injectable()
export class TrackerService{
  constructor(
    @InjectRepository(TrackerEntity) private readonly trackerRespository: Repository<TrackerEntity>,
    private readonly etapaTrackerService: EtapaTrackerService,
  ){}

  public async createTracker(fechaSolicitud: string)
  {
    const timestamp = new Date().getTime();
    const randomComponent = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const codigoAleatorio = timestamp + '' + randomComponent;

    try {
      const trackerDto : TrackerDTO = {
        codigo: codigoAleatorio,
        etapaActual: "Solicitud registrada",
        fechaInicio: fechaSolicitud,
        fechaCompletado: fechaSolicitud,
        descripcion: 'Solicitud de recolección enviada.',
        estado: 'Finalizado',
        archivo: ''
      };
      
      const tracker : TrackerEntity = await this.trackerRespository.save(trackerDto);

      if(!tracker)
      {
        return {
          state: false,
          message: "No se pudo crear el tracker",
          tracker: tracker,
          etapaTracker: null,
        };
      }

      const { state, message, etapaTracker } = await this.etapaTrackerService.createEtapaTracker(tracker, 1);

      return {
        state: true,
        message: "Tracker creado correctamente.",
        etapaTracker: etapaTracker,
        tracker: tracker
      };

    } catch (error) {
      console.log("trackerService L-55", error)
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async asignSolicitud(tracker: TrackerEntity, solicitud: SolicitudesEntity): Promise<UpdateResult>
  {
    try {
      const trackerUpdate : UpdateResult =  await this.trackerRespository.update({id: tracker.id}, {pedido: solicitud});
      return trackerUpdate;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findTrackers(): Promise<TrackerEntity[]>
  {
    try {
      const clientes : TrackerEntity[] = await this.trackerRespository.find();
      if(clientes.length === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningun usuario.'
        });
      }
      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findTrackerById(id: number): Promise<TrackerEntity>
  {
    try {
      const clientes : TrackerEntity =  await this.trackerRespository
        .createQueryBuilder('clientes')
        .where({id})
        .getOne();

        if(!clientes)
        {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: `No se encontró al usuario de Id = ${id}`
          });
        }

        return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateTracker(body, id: number)
  {
    try {
      const tracker: UpdateResult = await this.trackerRespository.update(id, body);
      if(tracker.affected === 0)
      {
        return {
          state: false,
          message: "No se pudo actualizar el tracker",
          tracker: tracker
        };
      }
      return {
        state: true,
        message: "Tracker actualizado correctamente",
        tracker: tracker
      };
    } catch (error) {
      console.log(error, "error en el trackerService-updateTracker")
      throw ErrorManager.createSignatureError(error.message);
    }
  }



  public async deleteTracker(id: string): Promise<DeleteResult> | undefined
  {
    try {
      const clientes: DeleteResult = await this.trackerRespository.delete(id);
      if(clientes.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el usuario, porque no existe.'
        });
      }
      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}