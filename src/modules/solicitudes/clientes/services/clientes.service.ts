import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ClienteDTO, ClienteUpdateDTO } from '../dto/cliente.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { ClientesEntity } from '../entities/clientes.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class ClientesService{
  constructor(
    @InjectRepository(ClientesEntity) private readonly clientesRespository: Repository<ClientesEntity>
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

  public async createCliente(body: ClienteDTO): Promise<ClientesEntity>
  {
    try {
      const clientes : ClientesEntity = await this.clientesRespository.save(body);
      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findClientes(): Promise<ClientesEntity[]>
  {
    try {
      const clientes : ClientesEntity[] = await this.clientesRespository.find();
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

  public async findClienteById(id: string): Promise<ClientesEntity>
  {
    try {
      const clientes : ClientesEntity =  await this.clientesRespository
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

  public async updateCliente(body: ClienteUpdateDTO, id: string): Promise<UpdateResult> | undefined
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

  public signJWT({
    payload,
    secret,
    expires
  }: {
    payload: jwt.JwtPayload; 
    secret: string; 
    expires: number | string;
  }){
    return jwt.sign(payload, secret, {expiresIn: expires});
  }

  public async generateJWT(tipo: number, cliente) : Promise<any>
  {
    const payload = {
      
    };
    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expires: '1h'
      }),
      cliente,
      rol: tipo
    }
  }
}