import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AreaEmpresaDTO, AreaEmpresaUpdateDTO } from '../dto/areaEmpresa.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { AreaEmpresaEntity } from '../entities/areasEmpresa.entity';

@Injectable()
export class AreaEmpresaService{
  constructor(
    @InjectRepository(AreaEmpresaEntity) private readonly areasRepository: Repository<AreaEmpresaEntity>
  ){}

  public async createAreaEmpresa(body: AreaEmpresaDTO): Promise<AreaEmpresaEntity>
  {
    try {
      const areaEmpresa : AreaEmpresaEntity = await this.areasRepository.save(body);
      return areaEmpresa;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAreasEmpresa(): Promise<AreaEmpresaEntity[]>
  {
    try {
      const areas : AreaEmpresaEntity[] = await this.areasRepository.find();
      return areas;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAreaEmpresaById(id: number): Promise<AreaEmpresaEntity>
  {
    try {
      const areas : AreaEmpresaEntity =  await this.areasRepository
        .createQueryBuilder('areasempresa')
        .where({id})
        .getOne();

        if(!areas)
        {
          throw new ErrorManager({
            type: 'NOT_FOUND',
            message: `No se encontró al área de Id = ${id}`
          });
        }

        return areas;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateAreaEmpresa(body: AreaEmpresaUpdateDTO, id: string): Promise<UpdateResult> | undefined
  {
    try {
      const areas: UpdateResult = await this.areasRepository.update(id, body);
      if(areas.affected === 0)
      {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se pudo actualizar el área, porque no existe.'
        });
      }
      return areas;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteAreaEmpresa(id: number): Promise<DeleteResult> | undefined
  {
    try {
      const areas: DeleteResult = await this.areasRepository.delete(id);
      if(areas.affected === 0)
      {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se pudo eliminar el área, porque no existe.'
        });
      }
      return areas;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}