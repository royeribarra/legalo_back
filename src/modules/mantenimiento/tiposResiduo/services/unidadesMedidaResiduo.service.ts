import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from '../../../../utils/error.manager';
import { UnidadesMedidaResiduoEntity } from '../entities/unidadesMedidaResiduo.entity';
import { UnidadMedidaTipoResiduoDTO } from '../dto/unidadMedidaTipoResiduo.dto';

@Injectable()
export class UnidadMedidaResiduoService{
  constructor(
    @InjectRepository(UnidadesMedidaResiduoEntity) private readonly unidadRepository: Repository<UnidadesMedidaResiduoEntity>
  ){}

  public async findUnidades(queryParams: any): Promise<UnidadesMedidaResiduoEntity[]>
  {
    const query = this.unidadRepository.createQueryBuilder('unidades');
    if (queryParams.arrayIds) {
      query.andWhere('unidades.id IN (:...ids)', { ids: queryParams.arrayIds });
    }

    try {
      const unidades: UnidadesMedidaResiduoEntity[] = await query
      .getMany();
      return unidades;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUnidadMedidaById(id: number): Promise<UnidadesMedidaResiduoEntity>
  {
    try {
      const unidad : UnidadesMedidaResiduoEntity =  await this.unidadRepository
        .createQueryBuilder('unidades')
        .where({id})
        .getOne();

        if(!unidad)
        {
          throw new ErrorManager({
            type: 'NOT_FOUND',
            message: `No se encontró la unidad de medida de Id = ${id}`
          });
        }

        return unidad;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findBy({key, value} : { key: keyof UnidadMedidaTipoResiduoDTO; value: any })
  {
    try {
      const unidad: UnidadesMedidaResiduoEntity = await this.unidadRepository.createQueryBuilder(
        'unidad'
      )
      .where({[key]: value})
      .getOne();
      return unidad;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}