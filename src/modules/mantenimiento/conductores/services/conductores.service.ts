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

  public async createConductor(body: ConductorDTO, vehiculo: VehiculosEntity)
  {
    const conductorExistsByDni = await this.findBy({
      key: 'dni',
      value: body.dni
    })

    if(conductorExistsByDni)
    {
      return {
        state: false,
        message: `Ya existe el conductor con dni ${body.dni}`,
        conductor: null
      }
    }

    const conductorExistsByCorreo = await this.findBy({
      key: 'correo',
      value: body.correo
    })

    if(conductorExistsByCorreo)
    {
      return {
        state: false,
        message: `Ya existe el conductor con correo ${body.correo}`,
        conductor: null
      }
    }

    const conductorExistsByLicencia = await this.findBy({
      key: 'licenciaConducir',
      value: body.licenciaConducir
    })

    if(conductorExistsByLicencia)
    {
      return {
        state: false,
        message: `Ya existe el conductor con licencia ${body.licenciaConducir}`,
        conductor: null
      }
    }

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
      nuevoConductor.tipo = body.tipo;
      const conductor : ConductoresEntity = await this.conductoresRespository.save(nuevoConductor);
      
      return {
        state: true,
        message: `Conductor creado correctamente`,
        conductor: conductor
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findConductores(queryParams): Promise<ConductoresEntity[]>
  {
    const query = this.conductoresRespository.createQueryBuilder('conductores')
      .leftJoinAndSelect('conductores.vehiculo', 'vehiculo');

    if (queryParams.disponibilidad) {
      
      query.andWhere('conductores.disponibilidad = :disponibilidad', { disponibilidad: queryParams.disponibilidad });
    }

    try {
      const conductoress: ConductoresEntity[] = await query.getMany();
      
      return conductoress;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findConductorById(id: number): Promise<ConductoresEntity>
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
      console.log(error, "error en conductorService - findConductorbyId")
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateConductor(body: ConductorUpdateDTO, id: number, vehiculo: VehiculosEntity)
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

      const conductor: UpdateResult = await this.conductoresRespository.update(id, dataConductor);
      if(conductor.affected === 0)
      {
        // throw new ErrorManager({
        //   type: 'BAD_REQUEST',
        //   message: 'No se pudo actualizar el conductor, porque no existe.'
        // });
        return {
          state: false,
          message: `No se pudo actualizar el conductor, porque no existe.`,
          conductor: conductor
        }
      }
      return {
        state: true,
        message: `Conductor actualizado correctamente`,
        conductor: conductor
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteConductor(id: string)
  {
    try {
      const conductor: DeleteResult = await this.conductoresRespository.softDelete(id);
      if(conductor.affected === 0)
      {
        return {
          state: false,
          message: `El conductor ya no existe.`
        }
      }
      return {
        state: true,
        message: `Conductor eliminado con éxito.`
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findBy({key, value} : { key: keyof ConductorDTO; value: any })
  {
    try {
      const conductor: ConductoresEntity = await this.conductoresRespository.createQueryBuilder(
        'conductores'
      )
      .where({[key]: value})
      .getOne();
      return conductor;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}