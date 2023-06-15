import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SucursalClienteDTO, SucursalClienteUpdateDTO } from '../dto/sucursalCliente.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { SucursalesClienteEntity } from '../entities/sucursalesCliente.entity';

@Injectable()
export class SucursalesClienteService{
  constructor(
    @InjectRepository(SucursalesClienteEntity) private readonly usuariosRespository: Repository<SucursalesClienteEntity>
  ){}

  public async createSucursal(body: SucursalClienteDTO): Promise<SucursalesClienteEntity>
  {
    try {
      const usuarios : SucursalesClienteEntity = await this.usuariosRespository.save(body);
      return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findSucursales(): Promise<SucursalesClienteEntity[]>
  {
    try {
      const usuarios : SucursalesClienteEntity[] = await this.usuariosRespository.find();
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

  public async findSucursalById(id: string): Promise<SucursalesClienteEntity>
  {
    try {
      const usuarios : SucursalesClienteEntity =  await this.usuariosRespository
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

  public async updateSucursal(body: SucursalClienteUpdateDTO, id: string): Promise<UpdateResult> | undefined
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

  public async deleteSucursal(id: string): Promise<DeleteResult> | undefined
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