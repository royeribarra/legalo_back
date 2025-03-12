import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ClienteDTO, ClienteUpdateDTO } from '../dto/cliente.dto';
import { ErrorManager } from '../../../utils/error.manager';
import { UsuariosService } from '../../usuario/usuario.service';
import { ClientesEntity } from '../entities/clientes.entity';
import { ClienteMailService } from '../../mail/services/clienteMail.service';
import { TrabajosEntity } from '../../trabajo/trabajos.entity';
import { OfertasEntity } from '../../oferta/oferta.entity';
import { FileEntity } from '../../tmp/file.entity';
import { UsuariosEntity } from '../../usuario/usuarios.entity';
import { randomBytes } from 'crypto';
import { RolEnum } from '../../usuario/roles.enum';
import { AbogadosEntity } from '../../abogado/entities/abogados.entity';
import { Brackets } from "typeorm";
import { IndustriasOfertaEntity } from 'src/modules/industria/industriaOferta.entity';
import { ServiciosOfertaEntity } from 'src/modules/servicio/servicioOferta.entity';
import { EspecialidadesOfertaEntity } from 'src/modules/especialidad/especialidadOferta.entity';

@Injectable()
export class ClienteService{
  constructor(
    @InjectRepository(ClientesEntity) private readonly clienteRepository: Repository<ClientesEntity>,
    @InjectRepository(TrabajosEntity) private readonly trabajoRepository: Repository<TrabajosEntity>,
    @InjectRepository(OfertasEntity) private readonly ofertaRepository: Repository<OfertasEntity>,
    @InjectRepository(FileEntity) private readonly tmpRepository: Repository<FileEntity>,
    @InjectRepository(UsuariosEntity) private readonly usuarioRepository: Repository<UsuariosEntity>,
    @InjectRepository(AbogadosEntity) private readonly abogadoRepository: Repository<AbogadosEntity>,
    private readonly usuariosService: UsuariosService,
    private readonly clienteMailService: ClienteMailService
  ){}

  public async createCliente(body: ClienteDTO)
  {
    const clienteExists = await this.findBy({
      key: 'correo',
      value: body.correo
    })

    const usuarioExistsCorreo = await this.usuarioRepository
      .createQueryBuilder('usuarios')
      .where('usuarios.correo = :correo', { correo: body.correo })
      .getOne();

    if(clienteExists || usuarioExistsCorreo)
    {
      return {
        state: false,
        message: `Ya existe un cliente registado con correo ${body.correo}`,
        usuario: null,
        cliente: null
      }
    }

    const clienteExistsDocumento = await this.findBy({
      key: 'documento',
      value: body.documento
    })

    const usuarioExistsDni = await this.usuarioRepository
    .createQueryBuilder('usuarios')
    .where('usuarios.dni = :dni', { dni: body.documento })
    .getOne();

    if(clienteExistsDocumento || usuarioExistsDni)
    {
      return {
        state: false,
        message: `Ya existe un cliente registado con documento ${body.documento}`,
        usuario: null,
        cliente: null
      }
    }
    try {
      const nuevoAbogado = new ClientesEntity();
      nuevoAbogado.nombres = body.nombres;
      nuevoAbogado.apellidos = body.apellidos;
      nuevoAbogado.opinion = body.opinion;
      nuevoAbogado.correo = body.correo;
      nuevoAbogado.documento = body.documento;
      nuevoAbogado.razon_social = body.empresa;
      nuevoAbogado.telefono_contacto = body.telefono;
      nuevoAbogado.tipo_persona = body.tipoPersona;

      const cliente : ClientesEntity = await this.clienteRepository.save(nuevoAbogado);

      const datosUsuario = {
        nombres: body.nombres,
        apellidos: body.apellidos,
        correo: body.correo,
        contrasena: body.contrasena,
        dni: body.documento,
        telefono: body.telefono,
        rol: RolEnum.CLIENTE,
        clienteId: cliente.id
      }

      const usuario = await this.usuariosService.createUsuario(datosUsuario);

      const activationCode = randomBytes(16).toString('hex');
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 48);

      try {
        await this.saveActivationCode(body.correo, activationCode, expirationTime);
      } catch (error) {
        throw ErrorManager.createSignatureError(error.message);
      }

      try {
        const { state } = await this.clienteMailService.sendActivationEmail(
          body.correo,
          body.nombres,
          body.apellidos,
          activationCode,
          expirationTime
        );
      } catch (error) {
        console.log("Error al enviar el mail:", error);
      }
      
      return {
        state: true,
        message: `Cliente creado correctamente`,
        cliente: cliente,
        usuario: usuario
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findClientes(queryParams): Promise<ClientesEntity[]>
  {
    const query = this.clienteRepository.createQueryBuilder('clientes')
      .leftJoinAndSelect('clientes.usuario', 'usuarios')
      .leftJoinAndSelect('clientes.ofertas', 'ofertas')
      .leftJoinAndSelect('clientes.trabajos', 'trabajos');
    try {
      const clientes: ClientesEntity[] = await query.getMany();
      
      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findClienteById(id: number): Promise<ClientesEntity>
  {
    try {
      const query = await this.clienteRepository
        .createQueryBuilder('clientes');

        query.where('clientes.id = :id', { id });

        const cliente = await query.getOne();
        if(!cliente)
        {
          return null;
        }

        return cliente;
    } catch (error) {
      console.log(error, "error en clienteService - findClientebyId")
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findBy({key, value} : { key: keyof ClienteDTO; value: any })
  {
    try {
      const usuario: ClientesEntity = await this.clienteRepository.createQueryBuilder(
        'clientes'
      )
      .where({[key]: value})
      .getOne();
      return usuario;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getOfertasByCliente(clienteId: number) {
    const cliente = await this.clienteRepository.findOne({
      where: { id: clienteId },
      relations: [
        'ofertas',
        'ofertas.serviciosOferta',
        'ofertas.serviciosOferta.servicio',
      ],
    });

    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }

    return cliente.ofertas;
  }

  async updateCliente(body: Partial<ClienteUpdateDTO>, id: number): Promise<{ state: boolean, message: string }> {
    // Buscar el abogado por ID
    const cliente = await this.clienteRepository.findOne({ where: { id } });

    // Si el abogado no existe, lanzamos una excepción
    if (!cliente) {
      return {
        state: false,
        message: `No existe el abogado con ID ${id} creado correctamente`,
      };
    }

    // Actualizamos los campos del abogado con los datos del DTO
    Object.assign(cliente, body);

    // Guardamos los cambios en la base de datos
    await this.clienteRepository.save(cliente);

    return {
      state: true,
      message: 'Cliente actualizado correctamente',
    };
  }

  public async getTrabajos(
    clienteId: number,
    estado?: string
  ): Promise<TrabajosEntity[]>
  {
    const query = this.trabajoRepository
        .createQueryBuilder('trabajo')
        .leftJoinAndSelect('trabajo.abogado', 'abogado')
        .leftJoinAndSelect('trabajo.aplicacion', 'aplicacion')
        .leftJoinAndSelect('aplicacion.oferta', 'oferta')
        .leftJoinAndSelect('oferta.especialidadesOferta', 'especialidadesOferta')
        .leftJoinAndSelect('especialidadesOferta.especialidad', 'especialidad')
        .leftJoinAndSelect('oferta.serviciosOferta', 'serviciosOferta')
        .leftJoinAndSelect('serviciosOferta.servicio', 'servicio')
        .leftJoinAndSelect('trabajo.cliente', 'cliente')
        .leftJoinAndSelect('trabajo.pagos', 'pagos')
        .leftJoinAndSelect('trabajo.progresos', 'progresos')
        .where('cliente.id = :id', { id: clienteId });

    if (estado) {
      query.andWhere('trabajo.estado = :estado', { estado });
    }

    // Ejecutamos la consulta
    const trabajos = await query.getMany();

    return trabajos;
  }

  async getOfertasConAplicaciones(clienteId: number) {
    try {
      return await this.ofertaRepository
        .createQueryBuilder('oferta')
        .innerJoinAndSelect('oferta.aplicaciones', 'aplicaciones')
        .innerJoinAndSelect('aplicaciones.abogado', 'abogado')
        .innerJoinAndSelect('oferta.cliente', 'cliente', 'cliente.deleted_at IS NULL')
        .where('cliente.id = :clienteId', { clienteId })
        .andWhere('aplicaciones.trabajo IS NULL')
        .getMany();
    } catch (error) {
      console.error('Falló la consulta', error);
      throw new Error('Error al obtener las ofertas con aplicaciones');
    }
  }

  async updateArchivosOferta(clienteId, ofertaId){
    const documentoTmpfile = await this.tmpRepository
    .createQueryBuilder('tmpfile')
    .where('tmpfile.clienteId = :clienteId', { clienteId })
    .andWhere('tmpfile.ofertaId = :ofertaId', { ofertaId })
    .andWhere('tmpfile.nombreArchivo = :nombreArchivo', { nombreArchivo: 'oferta_documento' }) // Buscar el archivo de documento
    .getOne();

    if (!documentoTmpfile) {
      return {
        state: false,
        message: 'No se encontró archivos temporales para actualizar.',
      };
    }

    const oferta = await this.ofertaRepository.findOne({
      where: { id: ofertaId },
    });

    if (documentoTmpfile) {
      oferta.documento_url = documentoTmpfile.filePath;
    }

    await this.ofertaRepository.save(oferta);

    return {
      state: true,
      message: 'Campos actualizados exitosamente',
      data: oferta,
    };
  }

  async getOfertas(clienteId: number, estado?: string) {
    const queryBuilder = this.clienteRepository
      .createQueryBuilder('cliente')
      .leftJoinAndSelect('cliente.ofertas', 'oferta')
      .leftJoinAndSelect('oferta.especialidadesOferta', 'especialidadesOferta')
      .leftJoinAndSelect('especialidadesOferta.especialidad', 'especialidad')
      .leftJoinAndSelect('oferta.industriasOferta', 'industriasOferta')
      .leftJoinAndSelect('industriasOferta.industria', 'industria')
      .leftJoinAndSelect('oferta.serviciosOferta', 'servicioOferta')
      .leftJoinAndSelect('servicioOferta.servicio', 'servicio')
      .leftJoinAndSelect('oferta.aplicaciones', 'aplicaciones')
      .leftJoinAndSelect('oferta.preguntas_oferta', 'preguntas_oferta')
      .leftJoinAndSelect('preguntas_oferta.respuestas', 'respuestas')
      .leftJoinAndSelect('respuestas.aplicacion', 'aplicacion')
      .leftJoinAndSelect('aplicaciones.abogado', 'abogado')
      .leftJoinAndSelect('aplicaciones.files', 'filesAplicacion')
      .leftJoinAndSelect('abogado.files', 'files')
      .leftJoinAndSelect('oferta.files', 'file')
      .where('cliente.id = :clienteId', { clienteId });

    // Agregar condición opcional para estado
    if (estado) {
      queryBuilder.andWhere('oferta.estado = :estado', { estado });
    }

    const cliente = await queryBuilder.getOne();
    if (!cliente) {
      return {
        state: true,
        data: []
      };
    }

    return {
      state: true,
      data: cliente.ofertas
    };
  }

  public async saveActivationCode(correo: string, activationCode: string, expiresAt: Date): Promise<void> {
    const user = await this.usuarioRepository.findOne({ where: { correo } });
    user.activationCode = activationCode;
    user.activationCodeExpires = expiresAt;
    await this.usuarioRepository.save(user);
  }

  public async findAbogados(clienteId: number, validadoAdmin: boolean): Promise<AbogadosEntity[]>
  {
    const query = this.abogadoRepository.createQueryBuilder('abogados')
      .leftJoinAndSelect('abogados.industriasAbogado', 'industriasAbogado')
      .leftJoinAndSelect('industriasAbogado.industria', 'industria')
      .leftJoinAndSelect('abogados.serviciosAbogado', 'serviciosAbogado')
      .leftJoinAndSelect('serviciosAbogado.servicio', 'servicio')
      .leftJoinAndSelect('abogados.especialidadesAbogado', 'especialidadesAbogado')
      .leftJoinAndSelect('especialidadesAbogado.especialidad', 'especialidad')
      .leftJoinAndSelect('abogados.files', 'files')
      .andWhere('abogados.validado_admin = :validado_admin', {
        validado_admin: validadoAdmin,
    });
    try {
      const clientes: AbogadosEntity[] = await query.getMany();

      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async obtenerAbogadosAptosPorcliente(clienteId: number): Promise<AbogadosEntity[]> {
    // Subconsulta para industrias
    const subqueryIndustrias = this.abogadoRepository
      .createQueryBuilder()
      .select('industriasOferta.industriaId')
      .from(IndustriasOfertaEntity, 'industriasOferta')
      .innerJoin(OfertasEntity, 'ofertas', 'industriasOferta.ofertaId = ofertas.id')
      .where('ofertas.clienteId = :clienteId', { clienteId })
      .getQuery();

    // Subconsulta para servicios
    const subqueryServicios = this.abogadoRepository
      .createQueryBuilder()
      .select('serviciosOferta.servicioId')
      .from(ServiciosOfertaEntity, 'serviciosOferta')
      .innerJoin(OfertasEntity, 'ofertas', 'serviciosOferta.ofertaId = ofertas.id')
      .where('ofertas.clienteId = :clienteId', { clienteId })
      .getQuery();

    // Subconsulta para especialidades
    const subqueryEspecialidades = this.abogadoRepository
      .createQueryBuilder()
      .select('especialidadesOferta.especialidadId')
      .from(EspecialidadesOfertaEntity, 'especialidadesOferta')
      .innerJoin(OfertasEntity, 'ofertas', 'especialidadesOferta.ofertaId = ofertas.id')
      .where('ofertas.clienteId = :clienteId', { clienteId })
      .getQuery();

    // Query principal para obtener los abogados
    const query = this.abogadoRepository.createQueryBuilder('abogados')
      .leftJoinAndSelect('abogados.industriasAbogado', 'industriasAbogado')
      .leftJoinAndSelect('industriasAbogado.industria', 'industria')
      .leftJoinAndSelect('abogados.serviciosAbogado', 'serviciosAbogado')
      .leftJoinAndSelect('serviciosAbogado.servicio', 'servicio')
      .leftJoinAndSelect('abogados.especialidadesAbogado', 'especialidadesAbogado')
      .leftJoinAndSelect('especialidadesAbogado.especialidad', 'especialidad')
      .leftJoinAndSelect('abogados.experiencias', 'experiencias')
      .leftJoinAndSelect('abogados.educaciones', 'educaciones')
      .leftJoinAndSelect('abogados.files', 'files')
      .where('abogados.validado_admin = :validado_admin', { validado_admin: true })
      .andWhere(new Brackets(qb => {
        qb.where(`industriasAbogado.industriaId IN (${subqueryIndustrias})`)
          .orWhere(`serviciosAbogado.servicioId IN (${subqueryServicios})`)
          .orWhere(`especialidadesAbogado.especialidadId IN (${subqueryEspecialidades})`);
      }))
      .setParameter('clienteId', clienteId); // Pasar el parámetro correctamente
    try {
      return await query.getMany();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}