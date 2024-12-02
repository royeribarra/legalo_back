import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from '../../utils/error.manager';
import { ServiciosEntity } from './servicios.entity';

@Injectable()
export class ServicioService{
  constructor(
    @InjectRepository(ServiciosEntity) private readonly servicioRepository: Repository<ServiciosEntity>
  ){}

  public async findServicios(queryParams): Promise<ServiciosEntity[]>
  {
    const query = this.servicioRepository.createQueryBuilder('servicios')
      .leftJoinAndSelect('servicios.serviciosAbogado', 'serviciosAbogado')
      .leftJoinAndSelect('servicios.serviciosOferta', 'serviciosOferta');
    try {
      const clientes: ServiciosEntity[] = await query.getMany();
      
      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findServicioById(id: number): Promise<ServiciosEntity>
  {
    try {
      const query = await this.servicioRepository
        .createQueryBuilder('servicios')
        .leftJoinAndSelect('servicios.serviciosAbogado', 'serviciosAbogado')
        .leftJoinAndSelect('servicios.serviciosOferta', 'serviciosOferta');

        query.where('servicios.id = :id', { id });
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