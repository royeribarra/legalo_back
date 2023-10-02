import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from '../../../../utils/error.manager';
import { UnidadesMedidaResiduoEntity } from '../entities/unidadesMedidaResiduo.entity';
import { TiposResiduoUnidadMedidaEntity } from '../entities/tiposResiduoUnidadMedida.entity';
import { TiposResiduoEntity } from '../entities/tiposResiduo.entity';

@Injectable()
export class TipoResiduoUnidadMedidaService{
  constructor(
    @InjectRepository(TiposResiduoUnidadMedidaEntity) private readonly unidadRepository: Repository<TiposResiduoUnidadMedidaEntity>
  ){}

  public async createTipoResiduoUnidadMedida(unidadMedida: UnidadesMedidaResiduoEntity, tipoResiduo: TiposResiduoEntity)
  {
    try {
      const newRelation = await this.unidadRepository.save({unidadMedida, tipoResiduo});

    } catch (error) {
      console.log(error, "createTipoResiduoUnidadMedida");
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteRelationByResiduoId(tipoResiduoId: number) 
  {
    try {
      const relations = await this.unidadRepository
      .createQueryBuilder('relation')
      .where('relation.tipoResiduo = :tipoResiduoId', { tipoResiduoId: tipoResiduoId })
      .getMany();
      for (const relation of relations) {
        await this.unidadRepository.remove(relation);
      }
    } catch (error) {
      console.log("error deleteRelationByResiduoId", error)
    }
  }
}