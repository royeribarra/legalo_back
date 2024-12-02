import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IndustriasEntity } from './industrias.entity';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class IndustriaService{
  constructor(
    @InjectRepository(IndustriasEntity) private readonly industriaRepository: Repository<IndustriasEntity>
  ){}

  public async findIndustrias(queryParams): Promise<IndustriasEntity[]>
  {
    const query = this.industriaRepository.createQueryBuilder('industrias')
      .leftJoinAndSelect('industrias.industriasAbogado', 'industriasAbogado')
      .leftJoinAndSelect('industrias.industriasOferta', 'industriasOferta');
    try {
      const clientes: IndustriasEntity[] = await query.getMany();
      
      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findIndustriaById(id: number): Promise<IndustriasEntity>
  {
    try {
      const query = await this.industriaRepository
        .createQueryBuilder('industrias')
        .leftJoinAndSelect('industrias.industriasAbogado', 'industriasAbogado')
        .leftJoinAndSelect('industrias.industriasOferta', 'industriasOferta');

        query.where('industrias.id = :id', { id });
        console.log(query.getQuery());

        const abogado = await query.getOne();
        if(!abogado)
        {
          return null;
        }

        return abogado;
    } catch (error) {
      console.log(error, "error en conductorService - findConductorbyId")
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}