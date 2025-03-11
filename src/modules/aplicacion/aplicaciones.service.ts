// src/aplicaciones/services/aplicaciones.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AplicacionesEntity } from './aplicaciones.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { AplicacionCreateDTO } from './aplicacion.dto';
import { FileEntity } from '../tmp/file.entity';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class AplicacionesService {
  constructor(
    @InjectRepository(AplicacionesEntity)
    private readonly aplicacionesRepository: Repository<AplicacionesEntity>,
    @InjectRepository(OfertasEntity)
    private readonly ofertasRepository: Repository<OfertasEntity>,
    @InjectRepository(AbogadosEntity)
    private readonly abogadosRepository: Repository<AbogadosEntity>,
    @InjectRepository(FileEntity)
    private readonly tmpRepository: Repository<FileEntity>,
  ) {}

  // Crear una nueva aplicación (postulación)
  async createAplicacion(body: AplicacionCreateDTO): Promise<AplicacionesEntity> {
    // Verificar si la oferta existe
    const oferta = await this.ofertasRepository.findOne({ where: { id: body.ofertaId } });
    if (!oferta) {
      throw new NotFoundException(`Oferta con ID ${body.ofertaId} no encontrada`);
    }

    // Verificar si el abogado existe
    const abogado = await this.abogadosRepository.findOne({ where: { id: body.abogadoId } });
    if (!abogado) {
      throw new NotFoundException(`Abogado con ID ${body.abogadoId} no encontrado`);
    }

    // Crear una nueva instancia de AplicacionesEntity
    const aplicacion = this.aplicacionesRepository.create({
      fecha_aplicacion: body.fecha_aplicacion,
      estado: body.estado,
      oferta,
      abogado,
    });

    // Guardar la aplicación en la base de datos
    return this.aplicacionesRepository.save(aplicacion);
  }

  async findAplicacionesByAbogadoId(abogadoId: number): Promise<AplicacionesEntity[]> {
    return this.aplicacionesRepository.find({
      where: {
        abogado: {
          id: abogadoId,
        },
      },
      relations: ['oferta', 'trabajo'], // Agrega las relaciones necesarias.
    });
  }

  // Método para actualizar los campos de documentoExtraUrl y videoExtraUrl
public async updateArchivosAplicacion(
  abogadoId: number,
  clienteId: number,
  aplicacionId: number
): Promise<any> {
  // Paso 1: Buscar los archivos temporales (TmpImageFileEntity) para ambos tipos
  const documentoTmpfile = await this.tmpRepository
    .createQueryBuilder('tmpfile')
    .where('tmpfile.clienteId = :clienteId', { clienteId })
    .andWhere('tmpfile.abogadoId = :abogadoId', { abogadoId })
    .andWhere('tmpfile.nombreArchivo = :nombreArchivo', { nombreArchivo: 'documento_aplicacion' }) // Buscar el archivo de documento
    .getOne();

  const videoTmpfile = await this.tmpRepository
      .createQueryBuilder('tmpfile')
      .where('tmpfile.clienteId = :clienteId', { clienteId })
      .andWhere('tmpfile.abogadoId = :abogadoId', { abogadoId })
      .andWhere('tmpfile.nombreArchivo = :nombreArchivo', { nombreArchivo: 'video_aplicacion' }) // Buscar el archivo de video
      .getOne();

    // Paso 2: Verificar si se encontraron los archivos temporales
    if (!documentoTmpfile && !videoTmpfile) {
      return {
        state: false,
        message: 'No se encontraron archivos temporales para actualizar.',
      };
    }

    // Paso 3: Buscar la aplicación (AplicacionesEntity) usando el aplicacionId
    const aplicacion = await this.aplicacionesRepository.findOne({
      where: { id: aplicacionId },
    });

    if (!aplicacion) {
      return {
        state: false,
        message: 'No se encontró la aplicación con el ID proporcionado',
      };
    }

    // Paso 4: Actualizar los campos de la aplicación
    if (documentoTmpfile) {
      aplicacion.documentoExtraUrl = documentoTmpfile.filePath; // Asignar el archivo de documento
    }

    if (videoTmpfile) {
      aplicacion.videoExtraUrl = videoTmpfile.filePath; // Asignar el archivo de video
    }

    // Paso 5: Guardar la aplicación con los campos actualizados
    await this.aplicacionesRepository.save(aplicacion);

    return {
      state: true,
      message: 'Campos actualizados exitosamente',
      data: aplicacion,
    };
  }

  async obtenerTotalAplicacionesPorAbogado(params: any) {
    try {
      const totalTrabajos = await this.aplicacionesRepository
        .createQueryBuilder('aplicaciones')
        .leftJoin('aplicaciones.abogado', 'abogado')
        .where('abogado.id = :abogadoId', { abogadoId: params.abogadoId })
        .select('COUNT(aplicaciones.id)', 'total')
        .getCount();

      return totalTrabajos || 0;
    } catch (error) {
      console.error('Error al obtener el total de aplicaciones por abogado:', error);
      throw new Error('No se pudo obtener el total de aplicaciones por abogado');
    }
  }
}
