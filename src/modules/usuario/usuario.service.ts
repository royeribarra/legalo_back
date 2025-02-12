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
import { AbogadoMailService } from '../mail/services/abogadoMail.service';
import { randomBytes } from 'crypto';

@Injectable()
export class UsuariosService{
  constructor(
    @InjectRepository(UsuariosEntity) private readonly usuariosRepository: Repository<UsuariosEntity>,
    @InjectRepository(AbogadosEntity) private readonly abogadosRepository: Repository<AbogadosEntity>,
    @InjectRepository(ClientesEntity) private readonly clientesRepository: Repository<ClientesEntity>,
    private readonly abogadoMailService: AbogadoMailService,
  ){}

  public async createUsuario(datosUsuario: UsuarioDTO)
  {
    const userExistsCorreo = await this.findBy({
      key: 'correo',
      value: datosUsuario.correo
    })

    if(userExistsCorreo)
    {
      return {
        state: false,
        message: `Ya existe el usuario con correo ${datosUsuario.correo}`,
        usuario: null
      }
    }

    const userExistsDni = await this.findBy({
      key: 'dni',
      value: datosUsuario.dni
    })
    if(userExistsDni)
      {
        return {
          state: false,
          message: `Ya existe el usuario con dni ${datosUsuario.correo}`,
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
      usuario.usuario = "user" + datosUsuario.dni;
      
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
      usuario.contrasena = await bcrypt.hash(datosUsuario.contrasena, +process.env.HASH_SALT);
      
      const newUsuario : UsuariosEntity = await this.usuariosRepository.save(usuario);
      console.log(newUsuario)
      return {
        state: true,
        message: `Usuario creado correctamente`,
        usuario: newUsuario
      }

    } catch (error) {
      console.log(error, "error creando usuario")
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUsuarios(queryParams): Promise<UsuariosEntity[]>
  {
    try {
      const query = this.usuariosRepository.createQueryBuilder('usuarios')
        .leftJoinAndSelect('usuarios.abogado', 'abogado')
        .leftJoinAndSelect('usuarios.cliente', 'cliente');
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
        .leftJoinAndSelect('usuarios.abogado', 'abogado')
        .leftJoinAndSelect('usuarios.cliente', 'cliente')
        .where('usuarios.id = :id', { id })
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
      .addSelect('usuario.contrasena')
      .leftJoinAndSelect('usuario.cliente', 'cliente')
      .leftJoinAndSelect('usuario.abogado', 'abogado')
      .leftJoinAndSelect('abogado.files', 'filesAbogado')
      .leftJoinAndSelect('cliente.files', 'filesCliente')
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
    console.log(code)
    return this.usuariosRepository.findOne({ where: { activationCode: code } });
  }

  public async activateUser(userId: number): Promise<void> {
    const user = await this.usuariosRepository.findOne({ where: { id: userId } });
    user.isActive = true;
    user.activationCode = null;
    await this.usuariosRepository.save(user);
  }

  public async validarUsuarioPorAdmin(abogadoId: number)
  {
    try {
      console.log(abogadoId)
      const abogado: AbogadosEntity = await this.abogadosRepository.findOneBy({ id: abogadoId });

      if (!abogado) {
        throw new Error("Abogado no encontrado");
      }

      const usuario: UsuariosEntity = await this.usuariosRepository
        .createQueryBuilder('usuario')
        .leftJoinAndSelect('usuario.abogado', 'abogado')
        .where('abogado.id = :abogadoId', { abogadoId })
        .getOne();

      if (!usuario) {
        throw new Error("Usuario no encontrado para el abogado dado");
      }

      const activationCode = randomBytes(16).toString('hex');  // Genera un código aleatorio de 32 caracteres
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 24); // Establece el tiempo de expiración a 24 horas

      try {
        await this.saveActivationCode(usuario.correo, activationCode, expirationTime);
      } catch (error) {
        throw ErrorManager.createSignatureError(error.message);
      }

      try {
        const { state } = await this.abogadoMailService.sendActivationEmail(
          usuario.correo, // Asegúrate de que `usuario` tiene un campo `correo`
          usuario.nombres,
          usuario.apellidos,
          activationCode,
          expirationTime
        );
      } catch (error) {
        console.log("Error al enviar el mail:", error);
      }

      return {
        state: true,
        message: "Usuario validado correctamente."
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async enviarCodigoVerificacion(abogadoId: number){
    try {
      const abogado: AbogadosEntity = await this.abogadosRepository.findOneBy({ id: abogadoId });

      if (!abogado) {
        throw new Error("Abogado no encontrado");
      }

      const usuario: UsuariosEntity = await this.usuariosRepository
        .createQueryBuilder('usuario')
        .leftJoinAndSelect('usuario.abogado', 'abogado')
        .where('abogado.id = :abogadoId', { abogadoId })
        .getOne();

      if (!usuario) {
        throw new Error("Usuario no encontrado para el abogado dado");
      }

      const activationCode = randomBytes(16).toString('hex');
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 48);

      try {
        await this.saveActivationCode(usuario.correo, activationCode, expirationTime);
      } catch (error) {
        throw ErrorManager.createSignatureError(error.message);
      }

      try {
        const { state } = await this.abogadoMailService.sendActivationEmail(
          usuario.correo,
          usuario.nombres,
          usuario.apellidos,
          activationCode,
          expirationTime
        );
      } catch (error) {
        console.log("Error al enviar el mail:", error);
      }

      return {
        state: true,
        message: "Usuario validado correctamente."
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}