import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { VehiculoDTO, VehiculoUpdateDTO } from '../dto/vehiculo.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { VehiculosEntity } from '../entities/vehiculo.entity';

@Injectable()
export class VehiculosService{
  constructor(
    @InjectRepository(VehiculosEntity) private readonly usuariosRespository: Repository<VehiculosEntity>
  ){}

  public async createVehiculo(body: VehiculoDTO): Promise<VehiculosEntity>
  {
    try {
      body.contrasena = await bcrypt.hash(body.contrasena, process.env.HASH_SALT);
      const usuarios : VehiculosEntity = await this.usuariosRespository.save(body);
      return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findVehiculos(): Promise<VehiculosEntity[]>
  {
    try {
      const usuarios : VehiculosEntity[] = await this.usuariosRespository.find();
      if(usuarios.length === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningun usuario.'
        });
      }
      return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findVehiculoById(id: string): Promise<VehiculosEntity>
  {
    try {
      const usuarios : VehiculosEntity =  await this.usuariosRespository
        .createQueryBuilder('usuarios')
        .where({id})
        .getOne();

        if(!usuarios)
        {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: `No se encontró al usuario de Id = ${id}`
          });
        }

        return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateVehiculo(body: VehiculoUpdateDTO, id: string): Promise<UpdateResult> | undefined
  {
    try {
      const usuarios: UpdateResult = await this.usuariosRespository.update(id, body);
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
      const usuarios: DeleteResult = await this.usuariosRespository.delete(id);
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