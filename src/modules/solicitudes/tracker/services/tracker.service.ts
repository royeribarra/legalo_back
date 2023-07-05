import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TrackerDTO, TrackerUpdateDTO } from '../dto/tracker.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { TrackerEntity } from '../entities/tracker.entity';

@Injectable()
export class TrackerService{
  constructor(
    @InjectRepository(TrackerEntity) private readonly clientesRespository: Repository<TrackerEntity>
  ){}

  public async existeClienteByCodigo(codigo: string): Promise<Boolean>
  {
    try {
      const clienteExistente = await this.clientesRespository
        .createQueryBuilder('clientes')
        .where('clientes.codigo = :codigo', { codigo })
        .getOne();
      return !!clienteExistente;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async createCliente(body: TrackerDTO): Promise<TrackerEntity>
  {
    try {
      const clientes : TrackerEntity = await this.clientesRespository.save(body);
      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findClientes(): Promise<TrackerEntity[]>
  {
    try {
      const clientes : TrackerEntity[] = await this.clientesRespository.find();
      if(clientes.length === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró ningun usuario.'
        });
      }
      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findClienteById(id: string): Promise<TrackerEntity>
  {
    try {
      const clientes : TrackerEntity =  await this.clientesRespository
        .createQueryBuilder('clientes')
        .where({id})
        .getOne();

        if(!clientes)
        {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: `No se encontró al usuario de Id = ${id}`
          });
        }

        return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateCliente(body: TrackerUpdateDTO, id: string): Promise<UpdateResult> | undefined
  {
    try {
      const clientes: UpdateResult = await this.clientesRespository.update(id, body);
      if(clientes.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar el usuario.'
        });
      }
      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteCliente(id: string): Promise<DeleteResult> | undefined
  {
    try {
      const clientes: DeleteResult = await this.clientesRespository.delete(id);
      if(clientes.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el usuario, porque no existe.'
        });
      }
      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}