import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsuarioDTO, UsuarioUpdateDTO } from './usuario.dto';
import { ErrorManager } from '../../utils/error.manager';
import { UsuariosEntity } from './usuarios.entity';
import { PerfilesEntity } from '../perfil/perfiles.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';

@Injectable()
export class UsuariosService{
  constructor(
    @InjectRepository(UsuariosEntity) private readonly usuariosRepository: Repository<UsuariosEntity>,
    @InjectRepository(AbogadosEntity) private readonly abogadosRepository: Repository<AbogadosEntity>,
    @InjectRepository(ClientesEntity) private readonly clientesRepository: Repository<ClientesEntity>,
  ){}

  public async createUsuario(datosUsuario: UsuarioDTO)
  {
    const userExists = await this.findBy({
      key: 'correo',
      value: datosUsuario.correo
    })

    if(userExists)
    {
      return {
        state: false,
        message: `Ya existe el usuario con correo ${datosUsuario.correo}`,
        usuario: null
      }
    }

    try {
      const usuario = new UsuariosEntity();
      usuario.correo = datosUsuario.correo;
      usuario.dni = datosUsuario.dni;
      usuario.nombres = datosUsuario.nombres;
      usuario.apellidos = datosUsuario.apellidos;
      usuario.telefono = datosUsuario.telefono;

      if (datosUsuario.abogadoId) {
        usuario.abogado = await this.abogadosRepository.findOneBy({
          id: datosUsuario.abogadoId,
        });
      }
  
      if (datosUsuario.clienteId) {
        usuario.cliente = await this.clientesRepository.findOneBy({
          id: datosUsuario.clienteId,
        });
      }

      usuario.contrasena = await bcrypt.hash(usuario.contrasena, +process.env.HASH_SALT);
      
      const newUsuario : UsuariosEntity = await this.usuariosRepository.save(usuario);
      
      return {
        state: true,
        message: `Usuario creado correctamente`,
        usuario: newUsuario
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

  public async updateUsuario(body: UsuarioUpdateDTO, id: number)
  {
    const userInfo = this.findUsuarioById(id);
    try {
      const data = new UsuariosEntity();
      data.correo = body.correo;
      data.dni = body.dni;
      data.nombres = body.nombre;
      data.apellidos = body.apellido;
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

  public async saveActivationCode(correo: string, activationCode: string, expiresAt: Date): Promise<void> {
    const user = await this.usuariosRepository.findOne({ where: { correo } });
    user.activationCode = activationCode;
    user.activationCodeExpires = expiresAt;
    await this.usuariosRepository.save(user);
  }

  public async findUserByActivationCode(code: string): Promise<UsuariosEntity | null> {
    return this.usuariosRepository.findOne({ where: { activationCode: code } });
  }

  public async activateUser(userId: number): Promise<void> {
    const user = await this.usuariosRepository.findOne({ where: { id: userId } });
    user.isActive = true;
    user.activationCode = null;
    await this.usuariosRepository.save(user);
  }
}