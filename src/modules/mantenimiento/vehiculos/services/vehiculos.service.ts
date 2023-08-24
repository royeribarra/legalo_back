import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { VehiculoDTO, VehiculoUpdateDTO } from '../dto/vehiculo.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { VehiculosEntity } from '../entities/vehiculo.entity';
import { TipoVehiculoService } from './tipoVehiculo.service';

@Injectable()
export class VehiculosService{
  constructor(
    @InjectRepository(VehiculosEntity) private readonly vehiculoRepository: Repository<VehiculosEntity>,
    private readonly tipoVehiculoService: TipoVehiculoService
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
      newEntity.nombre = body.nombre;
      newEntity.placa = body.placa;
      newEntity.responsable = body.responsable;
      newEntity.tipoVehiculo = tipoVehiculo;
      newEntity.unidadMedida = body.unidadMedida;
      console.log(newEntity)
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

  public async updateVehiculo(body: VehiculoUpdateDTO, id: string)
  {
    const tipoVehiculo = await this.tipoVehiculoService.findTipoVehiculoById(body.tipoVehiculoId);
    
    if(!tipoVehiculo)
    {
      return {
        state: false,
        message: `No se pudo actualizar porque el tipo de vehículo no existe.`,
        vehiculo: null
      }
    }

    const { tipoVehiculoId, ...restOfBody } = body;

    const newData = {
      ...restOfBody,
      tipoVehiculo: tipoVehiculo
    };

    try {
      const vehiculo: UpdateResult = await this.vehiculoRepository.update(id, newData);
      if(vehiculo.affected === 0)
      {
        return {
          state: false,
          message: `No se pudo actualizar el vehículo, porque no existe.`,
          vehiculo: null
        }
      }
      return {
        state: true,
        message: `Vehículo actualizado correctamente`,
        vehiculo: vehiculo
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteVehiculo(id: string)
  {
    try {
      const vehiculo: DeleteResult = await this.vehiculoRepository.delete(id);
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