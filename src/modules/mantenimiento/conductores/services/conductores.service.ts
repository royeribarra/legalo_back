import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ConductorDTO, ConductorUpdateDTO } from '../dto/conductor.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { ConductoresEntity } from '../entities/conductores.entity';

@Injectable()
export class ConductoresService{
  constructor(
    @InjectRepository(ConductoresEntity) private readonly conductoresRespository: Repository<ConductoresEntity>
  ){}

  public async createConductor(body: ConductorDTO): Promise<ConductoresEntity>
  {
    try {
      const conductores : ConductoresEntity = await this.conductoresRespository.save(body);
      return conductores;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findConductores(): Promise<ConductoresEntity[]>
  {
    try {
      const conductoress : ConductoresEntity[] = await this.conductoresRespository.find();
      if(conductoress.length === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningun usuario.'
        });
      }
      return conductoress;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findConductorById(id: string): Promise<ConductoresEntity>
  {
    try {
      const conductores : ConductoresEntity =  await this.conductoresRespository
        .createQueryBuilder('conductores')
        .where({id})
        .getOne();

        if(!conductores)
        {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: `No se encontró al usuario de Id = ${id}`
          });
        }

        return conductores;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateConductor(body: ConductorUpdateDTO, id: string): Promise<UpdateResult> | undefined
  {
    try {
      const conductores: UpdateResult = await this.conductoresRespository.update(id, body);
      if(conductores.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar el usuario.'
        });
      }
      return conductores;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteConductor(id: string): Promise<DeleteResult> | undefined
  {
    try {
      const conductores: DeleteResult = await this.conductoresRespository.delete(id);
      if(conductores.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el usuario, porque no existe.'
        });
      }
      return conductores;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}