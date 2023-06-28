import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TipoResiduoDTO, TipoResiduoUpdateDTO } from '../dto/tipoResiduo.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { TiposResiduoEntity } from '../entities/tiposResiduo.entity';

@Injectable()
export class TiposResiduoService{
  constructor(
    @InjectRepository(TiposResiduoEntity) private readonly usuariosRespository: Repository<TiposResiduoEntity>
  ){}

  public async createResiduo(body: TipoResiduoDTO): Promise<TiposResiduoEntity>
  {
    try {
      const usuarios : TiposResiduoEntity = await this.usuariosRespository.save(body);
      return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findResiduos(): Promise<TiposResiduoEntity[]>
  {
    try {
      const usuarios : TiposResiduoEntity[] = await this.usuariosRespository.find();
      if(usuarios.length === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningun usuario.'
        });
      }
      return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findResiduoById(id: string): Promise<TiposResiduoEntity>
  {
    try {
      const usuarios : TiposResiduoEntity =  await this.usuariosRespository
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

  public async updateResiduo(body: TipoResiduoUpdateDTO, id: string): Promise<UpdateResult> | undefined
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
      const usuarios: DeleteResult = await this.usuariosRespository.delete(id);
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