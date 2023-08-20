import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SucursalClienteDTO, SucursalClienteUpdateDTO } from '../dto/sucursalCliente.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { SucursalesClienteEntity } from '../entities/sucursalesCliente.entity';

@Injectable()
export class SucursalesClienteService{
  constructor(
    @InjectRepository(SucursalesClienteEntity) private readonly sucursalRepository: Repository<SucursalesClienteEntity>
  ){}

  public async existeSucursalByCodigo(codigoSucursal: string): Promise<SucursalesClienteEntity>
  {
    try {
      const sucursalExistente = await this.sucursalRepository
        .createQueryBuilder('sucursales')
        .where('sucursales.codigoSucursal = :codigoSucursal', { codigoSucursal })
        .getOne();
      return sucursalExistente;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async createSucursal(body: SucursalClienteDTO): Promise<SucursalesClienteEntity>
  {
    try {
      const usuarios : SucursalesClienteEntity = await this.sucursalRepository.save(body);
      return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findSucursales(): Promise<SucursalesClienteEntity[]>
  {
    try {
      const usuarios : SucursalesClienteEntity[] = await this.sucursalRepository.find();
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
      const usuarios : SucursalesClienteEntity =  await this.sucursalRepository
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

  public async findSucursalesByClienteId(id: string): Promise<SucursalesClienteEntity[]>
  {
    try {
      const sucursales : SucursalesClienteEntity[] =  await this.sucursalRepository
        .createQueryBuilder('sucursales')
        .where('sucursales.cliente_id = :id', {id})
        .getMany();

        return sucursales;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateSucursal(body: SucursalClienteUpdateDTO, id: string): Promise<UpdateResult> | undefined
  {
    try {
      const usuarios: UpdateResult = await this.sucursalRepository.update(id, body);
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
      const usuarios: DeleteResult = await this.sucursalRepository.delete(id);
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