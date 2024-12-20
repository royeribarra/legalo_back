import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { OfertaDTO } from './oferta.dto';
import { PreguntasOfertaEntity } from '../preguntas_oferta/preguntasOferta.entity';
import { EspecialidadesEntity } from '../especialidad/especialidades.entity';
import { ServiciosEntity } from '../servicio/servicios.entity';
import { OfertasEntity } from './oferta.entity';
import { TempFilesService } from '../tmp/tmpFile.service';
import { ErrorManager } from 'src/utils/error.manager';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { InvitacionesEntity } from './invitacion.entity';
import { ServiciosOfertaEntity } from '../servicio/servicioOferta.entity';
import { EspecialidadesOfertaEntity } from '../especialidad/especialidadOferta.entity';

@Injectable()
export class OfertaService{
  constructor(
    @InjectRepository(OfertasEntity) private readonly ofertaRepository: Repository<OfertasEntity>,
    @InjectRepository(AplicacionesEntity) private readonly aplicacionRepository: Repository<AplicacionesEntity>,
    @InjectRepository(TrabajosEntity) private readonly trabajoRepository: Repository<TrabajosEntity>,
    @InjectRepository(ClientesEntity) private readonly clienteRepository: Repository<ClientesEntity>,
    @InjectRepository(ServiciosEntity) private readonly servicioRepository: Repository<ServiciosEntity>,
    @InjectRepository(PreguntasOfertaEntity) private readonly preguntaRepository: Repository<PreguntasOfertaEntity>,
    @InjectRepository(EspecialidadesEntity) private readonly especialidadRepository: Repository<EspecialidadesEntity>,
    @InjectRepository(AbogadosEntity) private readonly abogadoRepository: Repository<AbogadosEntity>,
    @InjectRepository(InvitacionesEntity) private readonly invitacionRepository: Repository<InvitacionesEntity>,
    private readonly tempFilesService: TempFilesService,
  ){}

  public async createOferta(body: OfertaDTO)
  {
    const cliente = await this.clienteRepository.findOneBy({
      id: body.clienteId,
    });

    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }
    try {
      const nuevaOferta = new OfertasEntity();
      nuevaOferta.descripcion = body.descripcion;
      nuevaOferta.duracion = body.duracion;
      nuevaOferta.experiencia_abogado = body.nivelExperiencia;
      nuevaOferta.salario_minimo = body.presupuesto.salario_minimo;
      nuevaOferta.salario_maximo = body.presupuesto.salario_maximo;
      nuevaOferta.titulo = body.titulo;
      nuevaOferta.uso = body.uso;
      nuevaOferta.estado = "Creado";
      nuevaOferta.cliente = cliente;

      const tempFile = await this.tempFilesService.getFileByClienteIdAndArchivo(cliente.id, "oferta_documento");
      if (tempFile) {
        nuevaOferta.documento_url = tempFile.filePath;
          try {
            await this.tempFilesService.clearTempFile(tempFile.id);
        } catch (error) {
            console.error(`Error eliminando archivo temporal: ${tempFile.filePath}`, error);
        }
      }

      const oferta : OfertasEntity = await this.ofertaRepository.save(nuevaOferta);
      
      const especialidades = await this.especialidadRepository.findBy({
        id: In(body.especialidades),
      });
      const especialidadesAbogado = especialidades.map((especialidad) => {
        const relacion = new EspecialidadesOfertaEntity();
        relacion.oferta = oferta;
        relacion.especialidad = especialidad;
        return relacion;
      });
  
      const servicios = await this.servicioRepository.findBy({
        id: In(body.servicios),
      });
      const serviciosOferta = servicios.map((servicio) => {
        const relacion = new ServiciosOfertaEntity();
        relacion.oferta = oferta;
        relacion.servicio = servicio;
        return relacion;
      });
  
      // Preguntas
      const preguntas = body.preguntas.map((preguntaDTO) => {
        const pregunta = new PreguntasOfertaEntity();
        pregunta.pregunta = preguntaDTO.nombre;
        return pregunta;
      });
      oferta.preguntas_oferta = await this.preguntaRepository.save(preguntas);
      await this.ofertaRepository.save(oferta);

      return {
        state: true,
        message: `Oferta creado correctamente`,
        oferta: oferta
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOfertas(queryParams): Promise<OfertasEntity[]>
  {
    const query = this.ofertaRepository.createQueryBuilder('ofertas')
      .leftJoinAndSelect('ofertas.industriasOferta', 'industriasOferta')
      .leftJoinAndSelect('industriasOferta.industria', 'industria')
      .leftJoinAndSelect('ofertas.serviciosOferta', 'serviciosOferta')
      .leftJoinAndSelect('serviciosOferta.servicio', 'servicio')
      .leftJoinAndSelect('ofertas.especialidadesOferta', 'especialidadesOferta')
      .leftJoinAndSelect('especialidadesOferta.especialidad', 'especialidad')
      .leftJoinAndSelect('ofertas.cliente', 'cliente')
      .leftJoinAndSelect('ofertas.aplicaciones', 'aplicaciones')
      .leftJoinAndSelect('ofertas.preguntas_oferta', 'preguntas_oferta')
      .leftJoinAndSelect('ofertas.invitaciones', 'invitaciones')
      .leftJoinAndSelect('ofertas.pago', 'pago');
    try {
      const ofertas: OfertasEntity[] = await query.getMany();

      return ofertas;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOfertaById(id: number): Promise<OfertasEntity>
  {
    try {
      const query = await this.ofertaRepository
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

  async aceptarPostulacion(ofertaId: number, postulacionId: number): Promise<TrabajosEntity> {
    const oferta = await this.ofertaRepository.findOne({where: { id: ofertaId} });
    const postulacion = await this.aplicacionRepository.findOne({where: { id: postulacionId} });
    
    if (!oferta || !postulacion) {
      throw new Error('Oferta o postulación no encontrada');
    }

    // Crear el trabajo
    const trabajo = this.trabajoRepository.create({
      cliente: oferta.cliente,
      abogado: postulacion.abogado,
      aplicacion: postulacion,
      fecha_inicio: (new Date()).toDateString(),
      estado: 1,
    });
    
    // Guardar el trabajo y actualizar la postulación
    await this.trabajoRepository.save(trabajo);
    
    // Marcar la postulación como parte del trabajo
    postulacion.trabajo = trabajo;
    await this.aplicacionRepository.save(postulacion);

    return trabajo;
  }

  async getOfertasSinAplicacionesPorCliente(clienteId: number) {
    return this.ofertaRepository
      .createQueryBuilder('oferta')
      .leftJoinAndSelect('oferta.aplicaciones', 'aplicacion')
      .where('oferta.clienteId = :clienteId', { clienteId })
      .andWhere('aplicacion.id IS NULL')
      .getMany();
  }

  async getOfertasConAplicacionesPorCliente(clienteId: number) {
    try {
      return this.ofertaRepository
      .createQueryBuilder('oferta')
      .innerJoinAndSelect('oferta.aplicaciones', 'aplicaciones')
      .innerJoinAndSelect('aplicaciones.abogado', 'abogado')
      .innerJoinAndSelect('oferta.cliente', 'cliente', 'cliente.deleted_at IS NULL')
      .where('cliente.id = :clienteId', { clienteId })
      .getMany();
    } catch (error) {
      console.log("fallo la consulta")
    }
  }

  async getOfertasSinAplicacionesPorAbogado(clienteId: number, abogadoId: number) {
    const ofertasSinAplicaciones = await this.ofertaRepository
      .createQueryBuilder('oferta')
      .leftJoin('oferta.aplicaciones', 'aplicacion')
      .where('oferta.cliente_id = :clienteId', { clienteId })
      .andWhere(
        `NOT EXISTS (
          SELECT 1
          FROM aplicaciones aplicacionSub
          WHERE aplicacionSub.oferta_id = oferta.id
          AND aplicacionSub.abogado_id = :abogadoId
        )`,
        { abogadoId }
      )
      .getMany();
    return ofertasSinAplicaciones;
  }  

  async crearInvitacion(
    abogadoId: number,
    ofertaId: number,
    mensaje?: string,
  ) {
    const abogado = await this.abogadoRepository.findOneBy({ id: abogadoId });
    const oferta = await this.ofertaRepository.findOneBy({ id: ofertaId });
    console.log(oferta);
    console.log(abogado);
    if (!abogado || !oferta) {
      return {
        state: false,
        message: "No se encontró al abogado o la oferta"
      };
    }

    const nuevaInvitacion = this.invitacionRepository.create({
      abogado,
      oferta,
      mensaje,
    });
    const saveInvitacion = this.invitacionRepository.save(nuevaInvitacion)
    return {
      state: true,
      saveInvitacion,
      message: "Invitación creada correctamente"
    };
  }

  async obtenerInvitacionesPorAbogado(abogadoId: number): Promise<InvitacionesEntity[]> {
    return this.invitacionRepository.find({
      where: { abogado: { id: abogadoId } },
      relations: ['oferta'],
    });
  }

  async aceptarInvitacion(invitacionId: number): Promise<InvitacionesEntity> {
    const invitacion = await this.invitacionRepository.findOneBy({
      id: invitacionId,
    });

    if (!invitacion) {
      throw new Error('Invitación no encontrada.');
    }

    invitacion.aceptada = true;

    return this.invitacionRepository.save(invitacion);
  }
}