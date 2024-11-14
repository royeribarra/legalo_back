import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ClienteDTO } from '../dto/cliente.dto';
import { ErrorManager } from '../../../utils/error.manager';
import { EducacionesEntity } from '../../../../src/modules/educacion/educaciones.entity';
import { EspecialidadesEntity } from '../../../../src/modules/especialidad/especialidades.entity';
import { ExperienciasEntity } from '../../../../src/modules/experiencia/experiencias.entity';
import { HabilidadesBlandaEntity } from '../../../../src/modules/habilidadBlanda/habilidadesBlanda.entity';
import { HabilidadesDuraEntity } from '../../../../src/modules/habilidadDura/habilidadesDura.entity';
import { IndustriasEntity } from '../../../../src/modules/industria/industrias.entity';
import { ServiciosEntity } from '../../../../src/modules/servicio/servicios.entity';
import { UsuariosService } from '../../../../src/modules/usuario/usuario.service';
import { AbogadoMailService } from '../../../../src/modules/mail/services/abogadoMail.service';
import { ClientesEntity } from '../entities/clientes.entity';

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
    private readonly abogadoMailService: AbogadoMailService
  ){}

  public async createCliente(body: ClienteDTO)
  {

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

      const abogado : ClientesEntity = await this.clienteRepository.save(nuevoAbogado);

      const datosUsuario = {
        nombres: body.nombres,
        apellidos: body.apellidos,
        correo: body.correo,
        contrasena: body.contrasena,
        dni: body.documento,
        telefono: body.telefono,
        perfil: "Cliente",
        clienteId: abogado.id
      }
      console.log("creacion de usuario");
      const usuario = await this.usuariosService.createUsuario(datosUsuario);
      

      const { state } = await this.abogadoMailService.sendActivationEmail(body.correo, body.nombres, body.apellidos);
      console.log("envio de mail");
      return {
        state: true,
        message: `Cliente creado correctamente`,
        abogado: abogado,
        usuario: usuario
      }
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
}