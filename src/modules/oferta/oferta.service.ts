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

@Injectable()
export class OfertaService{
  constructor(
    @InjectRepository(OfertasEntity) private readonly ofertaRepository: Repository<OfertasEntity>,
    private readonly tempFilesService: TempFilesService
  ){}

  public async createOferta(body: OfertaDTO)
  {
    const preguntas = body.preguntas.map((preguntaDTO) => {
      const pregunta = new PreguntasOfertaEntity();
      pregunta.pregunta = preguntaDTO.nombre;
      pregunta.ofertas = null;
      return pregunta;
    });

    const especialidades = body.especialidades.map((especialidadDTO) => {
      const especialidad = new EspecialidadesEntity();
      especialidad.nombre = especialidadDTO.nombre;
      especialidad.ofertas = null;
      return especialidad;
    });

    const servicios = body.servicios.map((servicioDTO) => {
      const servicio = new ServiciosEntity();
      servicio.nombre = servicioDTO.nombre;
      servicio.ofertas = null;
      return servicio;
    });

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

      // const tempFile = await this.tempFilesService.getFileByDni('700');
      // if (!tempFile) {
      //   throw new BadRequestException('Archivo temporal no encontrado');
      // }
      // nuevaOferta.documento_url = tempFile.filePath;

      const oferta : OfertasEntity = await this.ofertaRepository.save(nuevaOferta);

      console.log("envio de mail");
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
}