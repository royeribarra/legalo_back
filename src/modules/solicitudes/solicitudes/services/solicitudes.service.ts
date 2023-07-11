import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SolicitudDTO, SolicitudUpdateDTO } from '../dto/solicitud.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { SolicitudesEntity } from '../entities/solicitudes.entity';
import { MailService } from '../../../mail/services/mail.service';
import { TrackerEntity } from '../../tracker/entities/tracker.entity';
import { TrackerDTO } from '../../tracker/dto/tracker.dto';

@Injectable()
export class SolicitudesService{
  constructor(
    @InjectRepository(SolicitudesEntity) private readonly solicitudRespository: Repository<SolicitudesEntity>,
    @InjectRepository(TrackerEntity) private readonly trackerRepository: Repository<TrackerEntity>,
    private mailService: MailService
  ){}

  public async createSolicitud(body: SolicitudDTO, tracker: TrackerDTO): Promise<SolicitudesEntity>
  {
    try {
      const lastRecord = await this.solicitudRespository.createQueryBuilder('solicitudes')
        .orderBy('solicitudes.id', 'DESC')
        .getOne();

      const solicitudBody = {
        ...body,
        codigo: 'COPTR-'+(lastRecord.id+1),
        tracker: tracker
      };

      const solicitud : SolicitudesEntity = await this.solicitudRespository.save(solicitudBody);

      return solicitud;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findSolicitudes(): Promise<SolicitudesEntity[]>
  {
    try {
      const roles : SolicitudesEntity[] = await this.solicitudRespository.find();
      if(roles.length === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningun usuario.'
        });
      }
      return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findSolicitudById(id: string): Promise<SolicitudesEntity>
  {
    try {
      const roles : SolicitudesEntity =  await this.solicitudRespository
        .createQueryBuilder('roles')
        .where({id})
        .getOne();

        if(!roles)
        {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: `No se encontró al usuario de Id = ${id}`
          });
        }

        return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateSolicitud(body, id: string): Promise<UpdateResult> | undefined
  {
    try {
      const roles: UpdateResult = await this.solicitudRespository.update(id, body);
      if(roles.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar el usuario.'
        });
      }
      return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteSolicitud(id: string): Promise<DeleteResult> | undefined
  {
    try {
      const roles: DeleteResult = await this.solicitudRespository.delete(id);
      if(roles.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el usuario, porque no existe.'
        });
      }
      return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async sendEmailConfirmation(){
    try {
      await this.mailService.sendUserConfirmation();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}