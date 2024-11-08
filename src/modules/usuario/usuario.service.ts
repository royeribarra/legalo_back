import { Injectable, ConflictException } from '@nestjs/common';
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

  public async createUsuario(body: UsuarioDTO, rol: RolesEntity)
  {
    const userExists = await this.findBy({
      key: 'correo',
      value: body.correo
    })

    if(userExists)
    {
      return {
        state: false,
        message: `Ya existe el usuario con correo ${body.correo}`,
        usuario: null
      }
    }

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
      
      return {
        state: true,
        message: `Usuario creado correctamente`,
        usuario: usuario
      }

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsuarios(queryParams): Promise<UsuariosEntity[]>
  {
    const query = this.usuariosRepository.createQueryBuilder('usuarios')
      .leftJoinAndSelect('usuarios.rol', 'rol');

    if (queryParams.rolId) {
      
      query.andWhere('rol.id = :id', { id: queryParams.rolId });
    }
    try {
      const usuarios: UsuariosEntity[] = await query.getMany();
      
      return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsuarioById(id: number): Promise<UsuariosEntity>
  {
    try {
      const usuario : UsuariosEntity =  await this.usuariosRepository
        .createQueryBuilder('usuarios')
        .leftJoinAndSelect('usuarios.rol', 'rol')
        .where({id})
        .getOne();

        if(!usuario)
        {
          throw new ErrorManager({
            type: 'NOT_FOUND',
            message: `No se encontró al usuario de Id = ${id}`
          });
        }

        return usuario;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateUsuario(body: UsuarioUpdateDTO, id: number, rol: RolesEntity)
  {
    const userInfo = this.findUsuarioById(id);
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
      data.contrasena = body.contrasena? await bcrypt.hash(body.contrasena, +process.env.HASH_SALT) : (await userInfo).contrasena;

      const usuario: UpdateResult = await this.usuariosRepository.update(id, data);
      if(usuario.affected === 0)
      {
        return {
          state: false,
          message: `No se pudo actualizar el usuario, porque no existe.`,
          usuario: usuario
        }
      }

      return {
        state: true,
        message: `Usuario actualizado correctamente`,
        usuario: usuario
      }

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUsuario(id: string)
  {
    try {
      const usuarios: DeleteResult = await this.usuariosRepository.softDelete(id);
      if(usuarios.affected === 0)
      {
        return {
          state: false,
          message: `El usuario ya no existe.`
        }
      }
      return {
        state: true,
        message: `Usuario eliminado con éxito.`
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findBy({key, value} : { key: keyof UsuarioDTO; value: any })
  {
    try {
      const usuario: UsuariosEntity = await this.usuariosRepository.createQueryBuilder(
        'usuario'
      )
      .leftJoinAndSelect('usuario.rol', 'rol')
      .addSelect('usuario.contrasena')
      .where({[key]: value})
      .getOne();
      return usuario;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsuariosBy({key, value} : { key: keyof UsuarioDTO; value: any })
  {
    try {
      const usuarios: UsuariosEntity[] = await this.usuariosRepository.createQueryBuilder(
        'usuarios'
      )
      .where({ [key]: value })
      .getMany();
      return usuarios;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}