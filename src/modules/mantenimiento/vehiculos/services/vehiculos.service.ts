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

  public async createVehiculo(body: VehiculoDTO, tipoVehiculo)
  {
    try {
      const newEntity = new VehiculosEntity();
      const newBody = {
        ...body,
        tipoVehiculo: tipoVehiculo
      }
      const vehiculo : VehiculosEntity = await this.vehiculoRepository.save(newBody);
      return {
        state: true,
        message: `Vehículo creado correctamente`,
        usuario: vehiculo
      }
    } catch (error) {
      console.log(error, "No se pudo crear el vehículo.")
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findVehiculos(queryParams): Promise<VehiculosEntity[]>
  {
    const query = this.vehiculoRepository.createQueryBuilder('vehiculos')
      .leftJoinAndSelect('vehiculos.tipoVehiculo', 'tipoVehiculo')
      .leftJoinAndSelect('vehiculos.conductor', 'conductor')
      .leftJoinAndSelect('vehiculos.asignaciones', 'asignaciones')

    // if (queryParams.disponibilidad) {
    //   query.andWhere('vehiculos.disponibilidad = :disponibilidad', { disponibilidad: queryParams.disponibilidad });
    // }

    if (queryParams.disponibleForThe) {
      query.andWhere('asignaciones.fechaRecoleccion IS NULL OR asignaciones.fechaRecoleccion != :fechaRecoleccion', { fechaRecoleccion: queryParams.disponibleForThe })
    }

    try {
      const vehiculos: VehiculosEntity[] = await query.getMany();
      
      return vehiculos;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  
  public async findVehiculosDisponibles(queryParams): Promise<VehiculosEntity[]>
  {
    const query = this.vehiculoRepository.createQueryBuilder('vehiculos')
      .leftJoinAndSelect('vehiculos.tipoVehiculo', 'tipoVehiculo')
      .leftJoinAndSelect('vehiculos.conductor', 'conductor')
      .leftJoinAndSelect('vehiculos.asignaciones', 'asignaciones')

    if (queryParams.fechaRecoleccion && queryParams.cantidad) {
      const subquery = this.vehiculoRepository.createQueryBuilder('subquery')
        .select('COALESCE(SUM(asignaciones.cantidad_total_usada), 0)', 'totalAsignado') // No sumamos la cantidad extra aquí
        .innerJoin('subquery.asignaciones', 'asignaciones')
        .where('subquery.id = vehiculos.id')
        .andWhere('asignaciones.fecha_recoleccion = :fechaRecoleccion');
    
      query.addSelect(`(${subquery.getQuery()})`, 'totalAsignado');
      query.andWhere(`(${subquery.getQuery()}) + :cantidad <= vehiculos.capacidad_carga`, {
        fechaRecoleccion: queryParams.fechaRecoleccion,
        cantidad: queryParams.cantidad
      });
    }
    
    try {
      const vehiculos: VehiculosEntity[] = await query.getRawMany();
      const vehiculosCopy = [...vehiculos as any];
      
      const resultadosConCapacidadDisponible = vehiculosCopy.map(vehiculo => {
        // Verificar si la propiedad temporal totalAsignado está presente
        const capacidadDisponible = vehiculo.totalAsignado
          ? vehiculo.capacidadCarga - vehiculo.totalAsignado
          : vehiculo.capacidadCarga;
        return {
          ...vehiculo,
          capacidadDisponible: capacidadDisponible
        };
      });
      
      return resultadosConCapacidadDisponible;
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