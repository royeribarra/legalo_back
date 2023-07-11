import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TrackerDTO, TrackerUpdateDTO } from '../dto/tracker.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { TrackerEntity } from '../entities/tracker.entity';
import { SolicitudDTO } from '../../solicitudes/dto/solicitud.dto';
import { SolicitudesEntity } from '../../solicitudes/entities/solicitudes.entity';

@Injectable()
export class TrackerService{
  constructor(
    @InjectRepository(TrackerEntity) private readonly trackerRespository: Repository<TrackerEntity>
  ){}

  public async existeClienteByCodigo(codigo: string): Promise<Boolean>
  {
    try {
      const clienteExistente = await this.trackerRespository
        .createQueryBuilder('clientes')
        .where('clientes.codigo = :codigo', { codigo })
        .getOne();
      return !!clienteExistente;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async createTracker(fechaSolicitud: string): Promise<TrackerEntity>
  {
    
    try {
      const trackerDto : TrackerDTO = {
        etapaActual: 1,
        fechaInicio: fechaSolicitud,
        fechaCompletado: fechaSolicitud,
        descripcion: 'Solicitud de recolección enviada.',
        estado: 'Completado',
        archivo: ''
      };
      
      const tracker : TrackerEntity = await this.trackerRespository.save(trackerDto);
      
      return tracker;
    } catch (error) {
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

  public async findClientes(): Promise<TrackerEntity[]>
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

  public async findClienteById(id: string): Promise<TrackerEntity>
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

  public async updateCliente(body: TrackerUpdateDTO, id: string): Promise<UpdateResult> | undefined
  {
    try {
      const clientes: UpdateResult = await this.trackerRespository.update(id, body);
      
      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteCliente(id: string): Promise<DeleteResult> | undefined
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