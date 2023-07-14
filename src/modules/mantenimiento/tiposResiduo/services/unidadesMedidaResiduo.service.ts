import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from '../../../../utils/error.manager';
import { UnidadesMedidaResiduoEntity } from '../entities/unidadesMedidaResiduo.entity';

@Injectable()
export class UnidadMedidaResiduoService{
  constructor(
    @InjectRepository(UnidadesMedidaResiduoEntity) private readonly unidadRespository: Repository<UnidadesMedidaResiduoEntity>
  ){}

  public async findUnidades(): Promise<UnidadesMedidaResiduoEntity[]>
  {
    try {
      const unidades : UnidadesMedidaResiduoEntity[] = await this.unidadRespository.find();
      return unidades;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}