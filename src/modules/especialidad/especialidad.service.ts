import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from '../../utils/error.manager';
import { EspecialidadesEntity } from './especialidades.entity';

@Injectable()
export class EspecialidadService{
  constructor(
    @InjectRepository(EspecialidadesEntity) private readonly especialidadRepository: Repository<EspecialidadesEntity>
  ){}

  public async findEspecialidades(queryParams): Promise<EspecialidadesEntity[]>
  {
    const query = this.especialidadRepository.createQueryBuilder('especialidades')
      .leftJoinAndSelect('especialidades.especialidadesAbogado', 'especialidadesAbogado')
      .leftJoinAndSelect('especialidades.especialidadesOferta', 'especialidadesOferta');
    try {
      const clientes: EspecialidadesEntity[] = await query.getMany();
      
      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findEspecialidadById(id: number): Promise<EspecialidadesEntity>
  {
    try {
      const query = await this.especialidadRepository
        .createQueryBuilder('especialidades')
        .leftJoinAndSelect('especialidades.especialidadesAbogado', 'especialidadesAbogado')
        .leftJoinAndSelect('especialidades.especialidadesOferta', 'especialidadesOferta');

        query.where('especialidades.id = :id', { id });
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