import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ConductorDTO, ConductorUpdateDTO } from '../dto/conductor.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { ConductoresEntity } from '../entities/conductores.entity';
import { VehiculosEntity } from '../../vehiculos/entities/vehiculo.entity';

@Injectable()
export class ConductoresService{
  constructor(
    @InjectRepository(ConductoresEntity) private readonly conductoresRespository: Repository<ConductoresEntity>
  ){}

  public async createConductor(body: ConductorDTO, vehiculo: VehiculosEntity): Promise<ConductoresEntity>
  {
    try {
      const nuevoConductor = new ConductoresEntity();
      nuevoConductor.apellido = body.apellido;
      nuevoConductor.correo = body.correo;
      nuevoConductor.direccion = body.direccion;
      nuevoConductor.disponibilidad = body.disponibilidad;
      nuevoConductor.dni = body.dni;
      nuevoConductor.fechaContratacion = body.fechaContratacion;
      nuevoConductor.fechaVencimientoLicencia = body.fechaVencimientoLicencia;
      nuevoConductor.licenciaConducir = body.licenciaConducir;
      nuevoConductor.nombre = body.nombre;
      nuevoConductor.vehiculo = vehiculo;
      nuevoConductor.telefono = body.telefono;
      const conductores : ConductoresEntity = await this.conductoresRespository.save(nuevoConductor);
      return conductores;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findConductores(): Promise<ConductoresEntity[]>
  {
    try {
      const conductoress : ConductoresEntity[] = await this.conductoresRespository
        .createQueryBuilder('conductores')
        .leftJoinAndSelect('conductores.vehiculo', 'vehiculo')
        .getMany();
      
      return conductoress;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findConductorById(id: string): Promise<ConductoresEntity>
  {
    try {
      const conductores : ConductoresEntity =  await this.conductoresRespository
        .createQueryBuilder('conductores')
        .leftJoinAndSelect('conductores.vehiculo', 'vehiculo')
        .where({id})
        .getOne();

        if(!conductores)
        {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: `No se encontró al conductor de Id = ${id}`
          });
        }

        return conductores;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateConductor(body: ConductorUpdateDTO, id: number, vehiculo: VehiculosEntity): Promise<UpdateResult> | undefined
  {
    try {
      const dataConductor = new ConductoresEntity();
      dataConductor.apellido = body.apellido;
      dataConductor.correo = body.correo;
      dataConductor.direccion = body.direccion;
      dataConductor.disponibilidad = body.disponibilidad;
      dataConductor.dni = body.dni;
      dataConductor.fechaContratacion = body.fechaContratacion;
      dataConductor.fechaVencimientoLicencia = body.fechaVencimientoLicencia;
      dataConductor.licenciaConducir = body.licenciaConducir;
      dataConductor.nombre = body.nombre;
      dataConductor.vehiculo = vehiculo;
      dataConductor.telefono = body.telefono;

      const conductores: UpdateResult = await this.conductoresRespository.update(id, dataConductor);
      if(conductores.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar el conductor, porque no existe.'
        });
      }
      return conductores;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteConductor(id: string): Promise<DeleteResult> | undefined
  {
    try {
      const conductores: DeleteResult = await this.conductoresRespository.delete(id);
      if(conductores.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el conductor, porque no existe.'
        });
      }
      return conductores;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}