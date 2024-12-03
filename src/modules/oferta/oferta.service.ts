import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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

@Injectable()
export class OfertaService{
  constructor(
    @InjectRepository(OfertasEntity) private readonly ofertaRepository: Repository<OfertasEntity>,
    @InjectRepository(AplicacionesEntity) private readonly aplicacionRepository: Repository<AplicacionesEntity>,
    @InjectRepository(TrabajosEntity) private readonly trabajoRepository: Repository<TrabajosEntity>,
    @InjectRepository(ClientesEntity) private readonly clienteRepository: Repository<ClientesEntity>,
    @InjectRepository(ClientesEntity) private readonly servicioRepository: Repository<ServiciosEntity>,
    @InjectRepository(ClientesEntity) private readonly preguntaRepository: Repository<PreguntasOfertaEntity>,
    @InjectRepository(ClientesEntity) private readonly especialidadRepository: Repository<EspecialidadesEntity>,
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

      const tempFile = await this.tempFilesService.getFileByClientId(body.clienteId);
      if (!tempFile) {
        throw new BadRequestException('Archivo temporal no encontrado');
      }
      nuevaOferta.documento_url = tempFile.filePath;

      const oferta : OfertasEntity = await this.ofertaRepository.save(nuevaOferta);

      
      const especialidades = body.especialidades.map((especialidadDTO) => {
        const especialidad = new EspecialidadesEntity();
        especialidad.nombre = especialidadDTO.nombre;
        return especialidad;
      });
      // oferta.especialidades = await this.especialidadRepository.save(especialidades);
  
      // Servicios
      const servicios = body.servicios.map((servicioDTO) => {
        const servicio = new ServiciosEntity();
        servicio.nombre = servicioDTO.nombre;
        return servicio;
      });
      // oferta.serviciosOferta = await this.servicioRepository.save(servicios);
  
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

  async getOfertasConAplicacionesPorCliente(clienteId: number) {
    return this.ofertaRepository.find({
      where: { cliente: { id: clienteId } },
      relations: ['aplicaciones', 'cliente'], // Incluye relaciones necesarias.
    });
  }
}