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
    @InjectRepository(ClientesEntity) private readonly clienteRepository: Repository<ClientesEntity>
  ){}

  public async existeClienteByCodigo(codigo: string): Promise<Boolean>
  {
    try {
      const clienteExistente = await this.clienteRepository
        .createQueryBuilder('clientes')
        .where('clientes.codigo = :codigo', { codigo })
        .getOne();
      return !!clienteExistente;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async createCliente(body: ClienteDTO)
  {
    try {
      const clientExistsByRuc = await this.findBy({
        key: 'ruc',
        value: body.ruc
      })

      const clientExistsByNombre = await this.findBy({
        key: 'nombre',
        value: body.nombre
      })

      if(clientExistsByRuc || clientExistsByNombre)
      {
        return {
          state: false,
          message: `Ya existe el cliente con ruc ${body.ruc} o nombre ${body.nombre}`,
          usuario: null
        }
      }

      const cliente : ClientesEntity = await this.clienteRepository.save(body);

      return {
        state: true,
        message: `Cliente creado correctamente`,
        cliente: cliente
      }
      
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findClientes(): Promise<ClientesEntity[]>
  {
    try {
      const clientes : ClientesEntity[] = await this.clienteRepository.find();
      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findClienteById(id: number): Promise<ClientesEntity>
  {
    try {
      const clientes : ClientesEntity =  await this.clienteRepository
        .createQueryBuilder('clientes')
        .where({id})
        .getOne();

        if(!clientes)
        {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: `No se encontró al cliente de Id = ${id}`
          });
        }

        return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateCliente(body: ClienteUpdateDTO, id: number)
  {
    try {
      const cliente: UpdateResult = await this.clienteRepository.update(id, body);
      if(cliente.affected === 0)
      {
        // throw new ErrorManager({
        //   type: 'BAD_REQUEST',
        //   message: 'No se pudo actualizar el cliente, porque no existe.'
        // });
        return {
          state: false,
          message: `No se pudo actualizar el cliente, porque no existe.`,
          cliente: null
        }
      }
      return {
        state: true,
        message: `Cliente actualizado correctamente`,
        cliente: cliente
      }

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteCliente(id: number)
  {
    try {
      const cliente: DeleteResult = await this.clienteRepository.delete(id);
      if(cliente.affected === 0)
      {
        // throw new ErrorManager({
        //   type: 'BAD_REQUEST',
        //   message: 'No se pudo eliminar el cliente, porque no existe.'
        // });
        return {
          state: false,
          message: `No se pudo eliminar el cliente, porque no existe.`,
        }
      }
      return {
        state: true,
        message: `Cliente eliminado con éxito.`,
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findBy({key, value} : { key: keyof ClienteDTO; value: any })
  {
    try {
      const usuario: ClientesEntity = await this.clienteRepository.createQueryBuilder(
        'cliente'
      )
      .where({[key]: value})
      .getOne();
      return usuario;
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