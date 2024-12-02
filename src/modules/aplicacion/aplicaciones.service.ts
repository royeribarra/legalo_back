// src/aplicaciones/services/aplicaciones.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AplicacionesEntity } from '../entities/aplicaciones.entity';
import { AplicacionCreateDTO } from '../dto/aplicacion-create.dto';
import { OfertasEntity } from '../../oferta/oferta.entity';
import { AbogadosEntity } from '../../abogado/entities/abogados.entity';

@Injectable()
export class AplicacionesService {
  constructor(
    @InjectRepository(AplicacionesEntity)
    private readonly aplicacionesRepository: Repository<AplicacionesEntity>,
    @InjectRepository(OfertasEntity)
    private readonly ofertasRepository: Repository<OfertasEntity>,
    @InjectRepository(AbogadosEntity)
    private readonly abogadosRepository: Repository<AbogadosEntity>,
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
      status: body.status,
      oferta,
      abogado,
    });

    // Guardar la aplicación en la base de datos
    return this.aplicacionesRepository.save(aplicacion);
  }
}
