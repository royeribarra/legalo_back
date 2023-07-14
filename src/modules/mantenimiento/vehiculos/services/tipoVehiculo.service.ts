import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TipoVehiculoDTO, TipoVehiculoUpdateDTO } from '../dto/tipoVehiculo.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { TipoVehiculoEntity } from '../entities/tipoVehiculo.entity';

@Injectable()
export class TipoVehiculoService{
  constructor(
    @InjectRepository(TipoVehiculoEntity) private readonly tipoVehiculoRepository: Repository<TipoVehiculoEntity>
  ){}

  public async createTipoVehiculo(body: TipoVehiculoDTO): Promise<TipoVehiculoEntity>
  {
    try {
      const vehiculo : TipoVehiculoEntity = await this.tipoVehiculoRepository.save(body);
      return vehiculo;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findTiposVehiculo(): Promise<TipoVehiculoEntity[]>
  {
    try {
      const tiposVehiculo : TipoVehiculoEntity[] = await this.tipoVehiculoRepository.find();
      return tiposVehiculo;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findTipoVehiculoById(id: number): Promise<TipoVehiculoEntity>
  {
    try {
      const tipoVehiculo : TipoVehiculoEntity =  await this.tipoVehiculoRepository
        .createQueryBuilder('tipos_vehiculo')
        .where({id})
        .getOne();
        return tipoVehiculo;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateTipoVehiculo(body: TipoVehiculoUpdateDTO, id: string): Promise<UpdateResult> | undefined
  {
    try {
      const usuarios: UpdateResult = await this.tipoVehiculoRepository.update(id, body);
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

  public async deleteTipoVehiculo(id: string): Promise<DeleteResult> | undefined
  {
    try {
      const usuarios: DeleteResult = await this.tipoVehiculoRepository.delete(id);
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