import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ResiduoRecojoDTO, ResiduoRecojoUpdateDTO } from '../dto/residuosRecojo.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { ResiduosRecojoEntity } from '../entities/residuosRecojo.entity';

@Injectable()
export class ResiduosRecojoService{
  constructor(
    @InjectRepository(ResiduosRecojoEntity) private readonly vehiculoRepository: Repository<ResiduosRecojoEntity>
  ){}

  public async createVehiculo(body: ResiduoRecojoDTO): Promise<ResiduosRecojoEntity>
  {
    try {
      
      const vehiculo : ResiduosRecojoEntity = await this.vehiculoRepository.save(body);
      return vehiculo;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findVehiculos(): Promise<ResiduosRecojoEntity[]>
  {
    try {
      const vehiculos : ResiduosRecojoEntity[] = await this.vehiculoRepository.find();
      
      return vehiculos;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findVehiculoById(id: number): Promise<ResiduosRecojoEntity>
  {
    try {
      const vehiculo : ResiduosRecojoEntity =  await this.vehiculoRepository
        .createQueryBuilder('vehiculos')
        .leftJoinAndSelect('vehiculos.tipoVehiculo', 'tipoVehiculo')
        .where({id})
        .getOne();

      if(!vehiculo)
      {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: `No se encontró al vehiculo de Id = ${id}`
        });
      }

      return vehiculo;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findVehiculoBy(campo: string, valor: string): Promise<ResiduosRecojoEntity>
  {
    try {
      const vehiculo : ResiduosRecojoEntity =  await this.vehiculoRepository
        .createQueryBuilder('vehiculos')
        .where(`vehiculos.${campo} = :valor`, { valor })
        .getOne();

        return vehiculo;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteVehiculo(id: string)
  {
    try {
      const vehiculo: DeleteResult = await this.vehiculoRepository.softDelete(id);
      if(vehiculo.affected === 0)
      {
        return {
          state: false,
          message: `No se pudo eliminar el vehículo, porque no existe.`,
        }
      }
      return {
        state: true,
        message: `Vehículo eliminado con éxito.`,
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}