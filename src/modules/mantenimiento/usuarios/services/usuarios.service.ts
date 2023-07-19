import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsuarioDTO, UsuarioUpdateDTO } from '../dto/usuario.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { UsuariosEntity } from '../entities/usuarios.entity';
import { RolesEntity } from '../../roles/entities/roles.entity';

@Injectable()
export class UsuariosService{
  constructor(
    @InjectRepository(UsuariosEntity) private readonly usuariosRepository: Repository<UsuariosEntity>
  ){}

  public async createUsuario(body: UsuarioDTO, rol: RolesEntity): Promise<UsuariosEntity>
  {
    try {
      const data = new UsuariosEntity();
      data.rol = rol;
      data.correo = body.correo;
      data.direccion = body.direccion;
      data.distrito = body.distrito;
      data.dni = body.dni;
      data.nombre = body.nombre;
      data.apellido = body.apellido;
      data.provincia = body.provincia;
      data.telefono = body.telefono;
      data.usuario = body.usuario;

      data.contrasena = await bcrypt.hash(body.contrasena, +process.env.HASH_SALT);
      
      const usuario : UsuariosEntity = await this.usuariosRepository.save(data);
      return usuario;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsuarios(): Promise<UsuariosEntity[]>
  {
    try {
      const usuarios : UsuariosEntity[] = await this.usuariosRepository.find();
      
      return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsuarioById(id: number): Promise<UsuariosEntity>
  {
    try {
      const usuarios : UsuariosEntity =  await this.usuariosRepository
        .createQueryBuilder('usuarios')
        .leftJoinAndSelect('usuarios.rol', 'rol')
        .where({id})
        .getOne();

        if(!usuarios)
        {
          throw new ErrorManager({
            type: 'NOT_FOUND',
            message: `No se encontró al usuario de Id = ${id}`
          });
        }

        return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateUsuario(body: UsuarioUpdateDTO, id: string, rol: RolesEntity): Promise<UpdateResult> | undefined
  {
    try {
      const data = new UsuariosEntity();
      data.rol = rol;
      data.correo = body.correo;
      data.direccion = body.direccion;
      data.distrito = body.distrito;
      data.dni = body.dni;
      data.nombre = body.nombre;
      data.apellido = body.apellido;
      data.provincia = body.provincia;
      data.telefono = body.telefono;
      data.usuario = body.usuario;

      const usuario: UpdateResult = await this.usuariosRepository.update(id, data);
      if(usuario.affected === 0)
      {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se pudo actualizar el usuario.'
        });
      }
      return usuario;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUsuario(id: string): Promise<DeleteResult> | undefined
  {
    try {
      const usuarios: DeleteResult = await this.usuariosRepository.delete(id);
      if(usuarios.affected === 0)
      {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No se pudo eliminar el usuario, porque no existe.'
        });
      }
      return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findBy({key, value} : { key: keyof UsuarioDTO; value: any })
  {
    try {
      const usuario: UsuariosEntity = await this.usuariosRepository.createQueryBuilder(
        'usuario'
      ).addSelect('usuario.contrasena')
      .where({[key]: value})
      .getOne();
      return usuario;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}