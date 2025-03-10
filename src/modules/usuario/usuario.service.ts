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
import { HabilidadesBlandaEntity } from '../habilidadBlanda/habilidadesBlanda.entity';
import { HabilidadesDuraEntity } from '../habilidadDura/habilidadesDura.entity';
import { IndustriasAbogadoEntity } from '../industria/industriaAbogado.entity';
import { ServiciosAbogadoEntity } from '../servicio/servicioAbogado.entity';
import { EspecialidadesAbogadoEntity } from '../especialidad/especialidadAbogado.entity';
import { ExperienciasEntity } from '../experiencia/experiencias.entity';
import { EducacionesEntity } from '../educacion/educaciones.entity';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { InvitacionesEntity } from '../oferta/invitacion.entity';
import { FileEntity } from '../tmp/file.entity';

@Injectable()
export class UsuariosService{
  constructor(
    @InjectRepository(UsuariosEntity) private readonly usuariosRepository: Repository<UsuariosEntity>,
    @InjectRepository(AbogadosEntity) private readonly abogadosRepository: Repository<AbogadosEntity>,
    @InjectRepository(ClientesEntity) private readonly clientesRepository: Repository<ClientesEntity>,
    @InjectRepository(HabilidadesBlandaEntity) private readonly habilidadesBlandaRepository: Repository<HabilidadesBlandaEntity>,
    @InjectRepository(HabilidadesDuraEntity) private readonly habilidadesDuraRepository: Repository<HabilidadesDuraEntity>,
    @InjectRepository(IndustriasAbogadoEntity) private readonly industriasAbogadoRepository: Repository<IndustriasAbogadoEntity>,
    @InjectRepository(ServiciosAbogadoEntity) private readonly serviciosAbogadoRepository: Repository<ServiciosAbogadoEntity>,
    @InjectRepository(EspecialidadesAbogadoEntity) private readonly especialidadesAbogadoRepository: Repository<EspecialidadesAbogadoEntity>,
    @InjectRepository(ExperienciasEntity) private readonly experienciasRepository: Repository<ExperienciasEntity>,
    @InjectRepository(EducacionesEntity) private readonly educacionesRepository: Repository<EducacionesEntity>,
    @InjectRepository(AplicacionesEntity) private readonly aplicacionesRepository: Repository<AplicacionesEntity>,
    @InjectRepository(TrabajosEntity) private readonly trabajosRepository: Repository<TrabajosEntity>,
    @InjectRepository(InvitacionesEntity) private readonly invitacionesRepository: Repository<InvitacionesEntity>,
    @InjectRepository(FileEntity) private readonly fileRepository: Repository<FileEntity>,

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
      usuario.rol= datosUsuario.rol;
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
        // .leftJoinAndSelect('abogado.files', 'files')
        // .leftJoinAndSelect('abogado.habilidadesBlandas', 'habilidadesBlandas')
        // .leftJoinAndSelect('abogado.habilidadesDuras', 'habilidadesDuras')
        // .leftJoinAndSelect('abogado.industriasAbogado', 'industriasAbogado')
        // .leftJoinAndSelect('industriasAbogado.industria', 'industria')
        // .leftJoinAndSelect('abogado.serviciosAbogado', 'serviciosAbogado')
        // .leftJoinAndSelect('serviciosAbogado.servicio', 'servicio')
        // .leftJoinAndSelect('abogado.especialidadesAbogado', 'especialidadesAbogado')
        // .leftJoinAndSelect('especialidadesAbogado.especialidad', 'especialidad')
        // .leftJoinAndSelect('abogado.experiencias', 'experiencias')
        // .leftJoinAndSelect('abogado.educaciones', 'educaciones')
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
      .leftJoinAndSelect('abogado.files', 'files')
      .leftJoinAndSelect('abogado.habilidadesBlandas', 'habilidadesBlandas')
      .leftJoinAndSelect('abogado.habilidadesDuras', 'habilidadesDuras')
      .leftJoinAndSelect('abogado.industriasAbogado', 'industriasAbogado')
      .leftJoinAndSelect('abogado.serviciosAbogado', 'serviciosAbogado')
      .leftJoinAndSelect('abogado.especialidadesAbogado', 'especialidadesAbogado')
      .leftJoinAndSelect('abogado.experiencias', 'experiencias')
      .leftJoinAndSelect('abogado.educaciones', 'educaciones')
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
    const user = await this.usuariosRepository.findOne({
      where: { id: userId },
      relations: ['abogado'],
    });
    if(user.abogado){
      const abogado = await this.abogadosRepository.findOne({ where: { id: user.abogado.id } });
      abogado.validado_admin = true;
      await this.abogadosRepository.save(abogado);
    }

    user.isActive = true;
    user.activationCode = null;
    await this.usuariosRepository.save(user);
  }

  public async validarUsuarioPorAdmin(abogadoId: number)
  {
    try {
      const abogado: AbogadosEntity = await this.abogadosRepository.findOneBy({ id: abogadoId });

      if (!abogado) {
        throw new Error("Abogado no encontrado");
      }

      // abogado.validado_admin = true;

      // await this.abogadosRepository.save(abogado);

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
          usuario.correo, // Asegúrate de que `usuario` tiene un campo `correo`
          usuario.nombres,
          usuario.apellidos,
          activationCode,
          expirationTime
        );
      } catch (error) {
        console.log("Error al enviar el mail:", error);
        throw ErrorManager.createSignatureError(error.message);
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

  public async rechazarUsuarioPorAdmin(abogadoId: number) {
    try {
      const abogado: AbogadosEntity = await this.abogadosRepository.findOne({
        where: { id: abogadoId },
        relations: ['usuario', 'habilidadesBlandas', 'habilidadesDuras', 'industriasAbogado', 'serviciosAbogado', 'especialidadesAbogado', 'experiencias', 'educaciones', 'aplicaciones', 'trabajos', 'invitaciones', 'files'] // Incluir todas las relaciones que deseas eliminar
      });
      if (!abogado) {
        throw new Error("Abogado no encontrado");
      }
      if (abogado.usuario) {
        await this.usuariosRepository.delete(abogado.usuario.id);
      }
  
      // Eliminar todas las relaciones manualmente
      await this.habilidadesBlandaRepository.delete({ abogado: { id: abogado.id } });
      await this.habilidadesDuraRepository.delete({ abogado: { id: abogado.id } });
      await this.industriasAbogadoRepository.delete({ abogado: { id: abogado.id } });
      await this.serviciosAbogadoRepository.delete({ abogado: { id: abogado.id } });
      await this.especialidadesAbogadoRepository.delete({ abogado: { id: abogado.id }});
      await this.experienciasRepository.delete({ abogado: { id: abogado.id } });
      await this.educacionesRepository.delete({ abogado: { id: abogado.id } });
      await this.aplicacionesRepository.delete({ abogado: { id: abogado.id }});
      await this.trabajosRepository.delete({ abogado: { id: abogado.id } });
      await this.invitacionesRepository.delete({ abogado: { id: abogado.id } });
      await this.fileRepository.delete({ abogado: { id: abogado.id }});
  
      // Ahora, eliminar al abogado
      await this.abogadosRepository.delete(abogadoId);
      await this.abogadoMailService.rechazarAbogado(abogado.nombres, abogado.apellidos, abogado.correo);
      return {
        state: true,
        message: "Usuario eliminado correctamente."
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}