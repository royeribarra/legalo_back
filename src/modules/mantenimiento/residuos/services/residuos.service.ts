import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ResiduoDTO, ResiduoUpdateDTO } from '../dto/residuo.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { ResiduosEntity } from '../entities/residuos.entity';

@Injectable()
export class ResiduosService{
  constructor(
    @InjectRepository(ResiduosEntity) private readonly usuariosRespository: Repository<ResiduosEntity>
  ){}

  public async createResiduo(body: ResiduoDTO): Promise<ResiduosEntity>
  {
    try {
      const usuarios : ResiduosEntity = await this.usuariosRespository.save(body);
      return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findResiduos(): Promise<ResiduosEntity[]>
  {
    try {
      const residuos : ResiduosEntity[] = await this.usuariosRespository.find({
        relations: ['tipoResiduo'],
      });
      
      return residuos;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findResiduoById(id: string): Promise<ResiduosEntity>
  {
    try {
      const usuarios : ResiduosEntity =  await this.usuariosRespository
        .createQueryBuilder('usuarios')
        .where({id})
        .getOne();

        if(!usuarios)
        {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: `No se encontró al usuario de Id = ${id}`
          });
        }

        return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateResiduo(body: ResiduoUpdateDTO, id: string): Promise<UpdateResult> | undefined
  {
    try {
      const usuarios: UpdateResult = await this.usuariosRespository.update(id, body);
      if(usuarios.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar el usuario.'
        });
      }
      return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteResiduo(id: string): Promise<DeleteResult> | undefined
  {
    try {
      const usuarios: DeleteResult = await this.usuariosRespository.softDelete(id);
      if(usuarios.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el usuario, porque no existe.'
        });
      }
      return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}