import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TipoResiduoDTO, TipoResiduoUpdateDTO } from '../dto/tipoResiduo.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { TiposResiduoEntity } from '../entities/tiposResiduo.entity';

@Injectable()
export class TiposResiduoService{
  constructor(
    @InjectRepository(TiposResiduoEntity) private readonly residuosRespository: Repository<TiposResiduoEntity>
  ){}

  public async createResiduo(body: TipoResiduoDTO): Promise<TiposResiduoEntity>
  {
    try {
      const residuo : TiposResiduoEntity = await this.residuosRespository.save(body);
      return residuo;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findResiduos(): Promise<TiposResiduoEntity[]>
  {
    try {
      // const residuos : TiposResiduoEntity[] = await this.residuosRespository.find({
      //   relations: ['medidasSeguridad', 'metodosTratamiento', 'normativas', 'propiedades', 'unidadesMedida']
      // });

      const residuos : TiposResiduoEntity[] = await this.residuosRespository
        .createQueryBuilder('tiposResiduo')
        // .leftJoinAndSelect('tiposResiduo.medidasSeguridad', 'medidasSeguridad')
        // .leftJoinAndSelect('tiposResiduo.metodosTratamiento', 'metodosTratamiento')
        // .leftJoinAndSelect('tiposResiduo.normativas', 'normativas')
        // .leftJoinAndSelect('tiposResiduo.propiedades', 'propiedades')

        .leftJoinAndSelect('tiposResiduo.unidadesMedida', 'unidadesMedida')
        .leftJoinAndSelect('unidadesMedida.unidadMedida', 'unidadMedida')
        .getMany();
      return residuos;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findResiduoById(id: number): Promise<TiposResiduoEntity>
  {
    try {
      const tipoResiduo : TiposResiduoEntity =  await this.residuosRespository
        .createQueryBuilder('tiposResiduo')
        .leftJoinAndSelect('tiposResiduo.unidadesMedida', 'unidadesMedida')
        .where({id})
        .getOne();

        return tipoResiduo;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateResiduo(body: TipoResiduoUpdateDTO, id: string): Promise<UpdateResult> | undefined
  {
    try {
      const usuarios: UpdateResult = await this.residuosRespository.update(id, body);
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
      const usuarios: DeleteResult = await this.residuosRespository.delete(id);
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