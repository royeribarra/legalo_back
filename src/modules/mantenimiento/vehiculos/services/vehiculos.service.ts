import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { VehiculoDTO, VehiculoUpdateDTO } from '../dto/vehiculo.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { VehiculosEntity } from '../entities/vehiculo.entity';

@Injectable()
export class VehiculosService{
  constructor(
    @InjectRepository(VehiculosEntity) private readonly vehiculoRepository: Repository<VehiculosEntity>
  ){}

  public async createVehiculo(body: VehiculoDTO, tipoVehiculo): Promise<VehiculosEntity>
  {
    try {
      const newEntity = new VehiculosEntity();
      newEntity.capacidadCarga = body.capacidadCarga;
      newEntity.certificado = '';
      newEntity.codigo = '';
      newEntity.disponibilidad = body.disponibilidad;
      newEntity.estadoMantenimiento = body.estadoMantenimiento;
      newEntity.nombre = '';
      newEntity.placa = body.placa;
      newEntity.responsable = body.responsable;
      newEntity.tipoVehiculo = tipoVehiculo;
      newEntity.unidadMedida = body.unidadMedida;
      const vehiculo : VehiculosEntity = await this.vehiculoRepository.save(newEntity);
      return vehiculo;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findVehiculos(): Promise<VehiculosEntity[]>
  {
    try {
      const vehiculos : VehiculosEntity[] = await this.vehiculoRepository.find();
      
      return vehiculos;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findVehiculoById(id: number): Promise<VehiculosEntity>
  {
    try {
      const vehiculo : VehiculosEntity =  await this.vehiculoRepository
        .createQueryBuilder('vehiculos')
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

  public async findVehiculoBy(campo: string, valor: string): Promise<VehiculosEntity>
  {
    try {
      const vehiculo : VehiculosEntity =  await this.vehiculoRepository
        .createQueryBuilder('vehiculos')
        .where(`vehiculos.${campo} = :valor`, { valor })
        .getOne();

        return vehiculo;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateVehiculo(body: VehiculoUpdateDTO, id: string): Promise<UpdateResult> | undefined
  {
    try {
      const usuarios: UpdateResult = await this.vehiculoRepository.update(id, body);
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

  public async deleteVehiculo(id: string): Promise<DeleteResult> | undefined
  {
    try {
      const usuarios: DeleteResult = await this.vehiculoRepository.delete(id);
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