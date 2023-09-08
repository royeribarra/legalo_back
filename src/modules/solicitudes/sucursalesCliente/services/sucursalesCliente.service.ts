import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SucursalClienteDTO, SucursalClienteUpdateDTO } from '../dto/sucursalCliente.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { SucursalesClienteEntity } from '../entities/sucursalesCliente.entity';
import { ClientesService } from '../../clientes/services/clientes.service';

@Injectable()
export class SucursalesClienteService{
  constructor(
    @InjectRepository(SucursalesClienteEntity) private readonly sucursalRepository: Repository<SucursalesClienteEntity>,
    private readonly clienteService: ClientesService,
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

  public async createSucursal(body: SucursalClienteDTO)
  {
    const cliente = await this.clienteService.findClienteById(body.clienteId);
    console.log(cliente)
    if (!cliente) {
      //throw new Error(`Cliente con id ${body.clienteId} no sé encontró.`);
      return {
        state: false,
        message: `Cliente con id ${body.clienteId} no sé encontró.`,
        cliente: null
      }
    }

    const sucursalExistsByRuc = await this.findBy({
      key: 'nombre',
      value: body.nombre
    })
    if(sucursalExistsByRuc)
    {
      return {
        state: false,
        message: `Ya existe el cliente con ruc ${body.nombre}`,
        usuario: null
      }
    }

    try {
      const data = new SucursalesClienteEntity();
      data.cliente = cliente;
      data.codigoSucursal = body.codigoSucursal;
      data.contacto = body.contacto;
      data.direccion = body.direccion;
      data.distrito = body.distrito;
      data.latitud = body.latitud;
      data.longitud = body.longitud;
      data.nombre = body.nombre;
      data.numeroContacto = body.numeroContacto;
      data.observaciones = body.observaciones;
      data.provincia = body.provincia;

      const sucursal : SucursalesClienteEntity = await this.sucursalRepository.save(data);
      return {
        state: true,
        message: `Sucursal creada correctamente`,
        cliente: sucursal
      }
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

  public async findSucursalById(id: number): Promise<SucursalesClienteEntity>
  {
    try {
      const sucursal : SucursalesClienteEntity =  await this.sucursalRepository
        .createQueryBuilder('sucursales')
        .leftJoinAndSelect('sucursales.cliente', 'cliente') // Unir con la entidad Cliente
        .where('sucursales.id = :id', { id })
        
        .getOne();

        if(!sucursal)
        {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: `No se encontró a la sucursal de Id = ${id}`
          });
        }

        return sucursal;
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

  public async updateSucursal(body: SucursalClienteUpdateDTO, id: string)
  {
    try {
      const sucursal: UpdateResult = await this.sucursalRepository.update(id, body);
      if(sucursal.affected === 0)
      {
        // throw new ErrorManager({
        //   type: 'BAD_REQUEST',
        //   message: 'No se pudo actualizar el usuario.'
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
        cliente: sucursal
      }

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteSucursal(id: string)
  {
    try {
      const usuarios: DeleteResult = await this.sucursalRepository.delete(id);
      if(usuarios.affected === 0)
      {
        // throw new ErrorManager({
        //   type: 'BAD_REQUEST',
        //   message: 'No se pudo eliminar el usuario, porque no existe.'
        // });
        return {
          state: false,
          message: 'No se pudo eliminar la sucursal, porque no existe.'
        }
      }
      return {
        state: true,
        message: "Sucursal eliminada con éxito."
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findBy({key, value} : { key: keyof SucursalClienteDTO; value: any })
  {
    try {
      const sucursal: SucursalesClienteEntity = await this.sucursalRepository.createQueryBuilder(
        'sucursales'
      )
      .leftJoinAndSelect('sucursales.cliente', 'cliente')
      .where({[key]: value})
      .getOne();
      return sucursal;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}