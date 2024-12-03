// src/trabajos/services/trabajos.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActualizarProgresoDTO, CrearTrabajoDTO } from './trabajo.dto';
import { TrabajosEntity } from './trabajos.entity';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';

@Injectable()
export class TrabajosService {
  constructor(
    @InjectRepository(TrabajosEntity)
    private readonly trabajosRepository: Repository<TrabajosEntity>,
    @InjectRepository(AplicacionesEntity)
    private readonly aplicacionesRepository: Repository<AplicacionesEntity>,
    @InjectRepository(ClientesEntity)
    private readonly clientesRepository: Repository<ClientesEntity>,
    @InjectRepository(AbogadosEntity)
    private readonly abogadosRepository: Repository<AbogadosEntity>
  ) {}

  // Lógica para crear un trabajo desde una aplicación aceptada
  async crearTrabajoDesdeAplicacion(
    aplicacionId: number,
    body: CrearTrabajoDTO
  ): Promise<TrabajosEntity> {
    // Buscar la aplicación
    const aplicacion = await this.aplicacionesRepository.findOne({ where: { id: aplicacionId }, relations: ['oferta', 'abogado'] });
    
    if (!aplicacion) {
      throw new NotFoundException(`Aplicación con ID ${aplicacionId} no encontrada`);
    }

    // Obtener el cliente de la oferta (el dueño de la oferta)
    const cliente = await this.clientesRepository.findOne({ where: { id: aplicacion.oferta.cliente.id } });
    if (!cliente) {
      throw new NotFoundException(`Cliente asociado a la oferta no encontrado`);
    }

    // Crear el trabajo
    const trabajo = this.trabajosRepository.create({
      estado: body.estado,  // Establecer el estado del trabajo
      fecha_inicio: body.fecha_inicio,
      fecha_fin: body.fecha_fin,
      cliente: cliente,
      abogado: aplicacion.abogado,  // El abogado que fue aceptado
      aplicacion: aplicacion,  // Relacionamos con la aplicación aceptada
    });

    // Guardamos el trabajo
    return this.trabajosRepository.save(trabajo);
  }

  async actualizarProgresoTrabajo(
    trabajoId: number,
    body: ActualizarProgresoDTO
  ): Promise<TrabajosEntity> {
    const trabajo = await this.trabajosRepository.findOne({ where: { id: trabajoId } });

    if (!trabajo) {
      throw new NotFoundException(`Trabajo con ID ${trabajoId} no encontrado`);
    }

    // Actualizamos el estado y/o progreso según los datos enviados
    if (body.estado !== undefined) {
      trabajo.estado = body.estado;  // Actualiza el estado del trabajo
    }
    if (body.progreso !== undefined) {
      trabajo.progreso = body.progreso;  // Actualiza el progreso
    }

    // Guardar los cambios
    return this.trabajosRepository.save(trabajo);
  }
}
