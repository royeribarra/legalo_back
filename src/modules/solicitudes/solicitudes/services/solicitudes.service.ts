import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SolicitudDTO, SolicitudUpdateDTO } from '../dto/solicitud.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { SolicitudesEntity } from '../entities/solicitudes.entity';

@Injectable()
export class SolicitudesService{
  constructor(
    @InjectRepository(SolicitudesEntity) private readonly rolesRespository: Repository<SolicitudesEntity>
  ){}

  public async createSolicitud(body): Promise<SolicitudesEntity>
  {
    try {
      const roles : SolicitudesEntity = await this.rolesRespository.save(body);
      return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findSolicitudes(): Promise<SolicitudesEntity[]>
  {
    try {
      const roles : SolicitudesEntity[] = await this.rolesRespository.find();
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
      const roles : SolicitudesEntity =  await this.rolesRespository
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
      const roles: UpdateResult = await this.rolesRespository.update(id, body);
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
      const roles: DeleteResult = await this.rolesRespository.delete(id);
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
}