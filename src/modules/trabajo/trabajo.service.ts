// src/trabajos/services/trabajos.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActualizarProgresoDTO, CrearTrabajoDTO } from './trabajo.dto';
import { TrabajosEntity } from './trabajos.entity';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { formatearFecha } from '../../utils/utils';
import { ErrorManager } from 'src/utils/error.manager';

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
    private readonly abogadosRepository: Repository<AbogadosEntity>,
    @InjectRepository(OfertasEntity)
    private readonly ofertaRepository: Repository<OfertasEntity>
  ) {}

  // Lógica para crear un trabajo desde una aplicación aceptada
  async crearTrabajoDesdeAplicacion(
    aplicacionId: number,
    body: CrearTrabajoDTO
  ): Promise<TrabajosEntity> {
    const aplicacion = await this.aplicacionesRepository.findOne({ where: { id: aplicacionId }, relations: ['oferta', 'abogado'] });
    
    if (!aplicacion) {
      throw new NotFoundException(`Aplicación con ID ${aplicacionId} no encontrada`);
    }

    // Obtener el cliente de la oferta (el dueño de la oferta)
    const cliente = await this.clientesRepository.findOne({ where: { id: body.clienteId } });
    if (!cliente) {
      throw new NotFoundException(`Cliente asociado a la oferta no encontrado`);
    }

    // Crear el trabajo
    const trabajo = this.trabajosRepository.create({
      estado: body.estado,
      progreso: 20,
      fecha_inicio: body.fecha_inicio,
      fecha_fin: body.fecha_fin,
      cliente: cliente,
      abogado: aplicacion.abogado,
      aplicacion: aplicacion,
    });

    // Guardamos el trabajo
    return this.trabajosRepository.save(trabajo);
  }

  async actualizarProgresoTrabajo(
    body: ActualizarProgresoDTO
  ): Promise<TrabajosEntity> {
    const trabajo = await this.trabajosRepository.findOne({ where: { id: body.trabajoId } });

    if (!trabajo) {
      throw new NotFoundException(`Trabajo con ID ${body.trabajoId} no encontrado`);
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

  async getTrabajosFinalizadosPorCliente(clienteId: number) {
    return this.trabajosRepository
      .createQueryBuilder('trabajo')
      .where('trabajo.cliente.id = :clienteId', { clienteId }) // Usamos trabajo.cliente.id en lugar de trabajo.clienteId
      .andWhere('trabajo.estado = :estado', { estado: 4 }) // Filtrar por estado "finalizado"
      .getMany();
  }

  async getTrabajosEnProcesoPorCliente(clienteId: number) {
    return this.trabajosRepository
      .createQueryBuilder('trabajo')
      .leftJoinAndSelect('trabajo.aplicacion', 'aplicacion')  // Realiza un LEFT JOIN para traer la relación con Aplicaciones
      .where('trabajo.clienteId = :clienteId', { clienteId })
      .andWhere('trabajo.estado > 0 AND trabajo.estado < 5')  // Filtrar entre estado 1 (creado), 2 (progreso) y 3 (validación)
      .andWhere('trabajo.aplicacion IS NULL')  // Asegurarse de que no haya aplicaciones asociadas
      .getMany();
  }

  async createTrabajo(body: CrearTrabajoDTO): Promise<TrabajosEntity> {
    const aplicacion = await this.aplicacionesRepository.findOne({ where: { id: body.aplicacionId }, relations: ['oferta', 'oferta.cliente', 'abogado'] });
    if (!aplicacion) {
      throw new NotFoundException(`Aplicación con ID ${body.aplicacionId} no encontrada`);
    }

    // Obtener el cliente de la oferta (el dueño de la oferta)
    const cliente = await this.clientesRepository.findOne({ where: { id: aplicacion.oferta.cliente.id } });
    if (!cliente) {
      throw new NotFoundException(`Cliente asociado a la aplicacion no encontrado`);
    }

    const oferta = await this.ofertaRepository.findOne({ where: { id: aplicacion.oferta.id } });
    if (!oferta) {
      throw new BadRequestException('La oferta no existe');
    }

    const abogado = await this.abogadosRepository.findOne({ where: { id: aplicacion.abogado.id } });
    if (!abogado) {
      throw new NotFoundException(`Abogado asociado a la aplicacion no encontrado`);
    }

    // Actualizar el estado de la oferta
    oferta.estado = 'asignado';
    await this.ofertaRepository.save(oferta);

    aplicacion.estado = 'aceptado';
    await this.aplicacionesRepository.save(aplicacion);

    await this.aplicacionesRepository
      .createQueryBuilder('aplicaciones')
      .leftJoin('aplicaciones.oferta', 'oferta')
      .update(AplicacionesEntity)
      .set({ estado: 'cerrado' })
      .where('oferta.id = :id', { id: body.ofertaId })
      .andWhere('aplicaciones.id != :id', { id: body.aplicacionId })
      .execute();

    const trabajo = this.trabajosRepository.create({
      estado: "creado",
      progreso: 20,
      fecha_inicio: formatearFecha(new Date()),
      cliente: cliente,
      abogado: abogado,
      aplicacion: aplicacion,
    });

    // Guardamos el trabajo
    return this.trabajosRepository.save(trabajo);
  }

  public async findTrabajos(queryParams): Promise<TrabajosEntity[]> {
    const query = this.trabajosRepository.createQueryBuilder('trabajos')
      .leftJoinAndSelect('trabajos.cliente', 'cliente')
      .leftJoinAndSelect('trabajos.abogado', 'abogado')
      .leftJoinAndSelect('trabajos.aplicacion', 'aplicacion')
      .leftJoinAndSelect('trabajos.pagos', 'pagos')

    if (queryParams.estado) {
      query.andWhere('trabajos.estado = :estado', {
        estado: queryParams.estado,
      });
    }

    if (queryParams.daysAgo) {
      const daysAgo = parseInt(queryParams.daysAgo, 10);
      if (isNaN(daysAgo) || daysAgo <= 0) {
        throw new Error('El parámetro daysAgo debe ser un número positivo');
      }
      const dateLimit = new Date();
      dateLimit.setDate(dateLimit.getDate() - daysAgo);

      query.andWhere('trabajos.created_at >= :dateLimit', { dateLimit });
    }

    try {
      const trabajos: TrabajosEntity[] = await query.getMany();
      return trabajos;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
