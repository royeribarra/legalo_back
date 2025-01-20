import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ClienteDTO, ClienteUpdateDTO } from '../dto/cliente.dto';
import { ErrorManager } from '../../../utils/error.manager';
import { EducacionesEntity } from '../../educacion/educaciones.entity';
import { EspecialidadesEntity } from '../../especialidad/especialidades.entity';
import { ExperienciasEntity } from '../../experiencia/experiencias.entity';
import { HabilidadesBlandaEntity } from '../../habilidadBlanda/habilidadesBlanda.entity';
import { HabilidadesDuraEntity } from '../../habilidadDura/habilidadesDura.entity';
import { IndustriasEntity } from '../../industria/industrias.entity';
import { ServiciosEntity } from '../../servicio/servicios.entity';
import { UsuariosService } from '../../usuario/usuario.service';
import { AbogadoMailService } from '../../mail/services/abogadoMail.service';
import { ClientesEntity } from '../entities/clientes.entity';
import { ClienteMailService } from '../../mail/services/clienteMail.service';

@Injectable()
export class ClienteService{
  constructor(
    @InjectRepository(ClientesEntity) private readonly clienteRepository: Repository<ClientesEntity>,
    @InjectRepository(EducacionesEntity) private readonly educacionesRepository: Repository<EducacionesEntity>,
    @InjectRepository(EspecialidadesEntity) private readonly especialidadesRepository: Repository<EspecialidadesEntity>,
    @InjectRepository(ExperienciasEntity) private readonly experienciaRepository: Repository<ExperienciasEntity>,

    @InjectRepository(HabilidadesBlandaEntity) private readonly habilidadBlandRepository: Repository<HabilidadesBlandaEntity>,
    @InjectRepository(HabilidadesDuraEntity) private readonly habilidadDurRepository: Repository<HabilidadesDuraEntity>,
    @InjectRepository(IndustriasEntity) private readonly industriaRepository: Repository<IndustriasEntity>,
    @InjectRepository(ServiciosEntity) private readonly servicioRepository: Repository<ServiciosEntity>,
    private readonly usuariosService: UsuariosService,
    private readonly clienteMailService: ClienteMailService
  ){}

  public async createCliente(body: ClienteDTO)
  {
    const clienteExists = await this.findBy({
      key: 'correo',
      value: body.correo
    })

    if(clienteExists)
    {
      return {
        state: false,
        message: `Ya existe un cliente registado con correo ${body.correo}`,
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
        perfil: "Cliente",
        clienteId: cliente.id
      }
      console.log("creacion de usuario");
      const usuario = await this.usuariosService.createUsuario(datosUsuario);
      

      const { state } = await this.clienteMailService.sendActivationEmail(body.correo, body.nombres, body.apellidos);
      console.log("envio de mail");
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
        .createQueryBuilder('abogados')
        .leftJoinAndSelect('abogados.habilidadesBlandas', 'habilidadesBlandas')
        .leftJoinAndSelect('abogados.habilidadesDuras', 'habilidadesDuras')
        .leftJoinAndSelect('abogados.industrias', 'industrias')
        .leftJoinAndSelect('abogados.servicios', 'servicios')
        .leftJoinAndSelect('abogados.experiencias', 'experiencias')
        .leftJoinAndSelect('abogados.educaciones', 'educaciones')
        .leftJoinAndSelect('abogados.especialidades', 'especialidades');

        query.where('abogados.id = :id', { id });
        console.log(query.getQuery());

        const abogado = await query.getOne();
        if(!abogado)
        {
          return null;
        }

        return abogado;
    } catch (error) {
      console.log(error, "error en conductorService - findConductorbyId")
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
}