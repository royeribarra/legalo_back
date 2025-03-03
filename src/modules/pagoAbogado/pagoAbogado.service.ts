import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagosAbogadoEntity } from './pagoAbogado.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { TrabajosService } from '../trabajo/trabajo.service';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { PagoAbogadoDTO } from './pagoAbogado.dto';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';

@Injectable()
export class PagoAbogadoService {
  constructor(
    @InjectRepository(PagosAbogadoEntity)
    private readonly pagoAbogadoRepository: Repository<PagosAbogadoEntity>,
    @InjectRepository(OfertasEntity)
    private readonly ofertaRepository: Repository<OfertasEntity>,
    @InjectRepository(AplicacionesEntity)  private readonly aplicacionRepository: Repository<AplicacionesEntity>,
    @InjectRepository(TrabajosEntity)  private readonly trabajoRepository: Repository<TrabajosEntity>,
    @InjectRepository(ClientesEntity)  private readonly clienteRepository: Repository<ClientesEntity>,
    @InjectRepository(AbogadosEntity)  private readonly abogadosRepository: Repository<AbogadosEntity>,
  ) {}
  async realizarPagoAbogado(data: PagoAbogadoDTO): Promise<PagosAbogadoEntity> {
    const { operacion, abogadoId, monto, tipoPago, trabajoId } = data;

    const trabajo = await this.trabajoRepository.findOne({
      where: { id: trabajoId },
      relations: ['aplicacion', 'aplicacion.abogado'], // Se agrega la relación anidada
    });

    if (!trabajo) {
      throw new BadRequestException('El trabajo no existe');
    }
    if (!trabajo.aplicacion || !trabajo.aplicacion.abogado) {
      throw new BadRequestException('No se encontró un abogado para esta aplicación');
    }

    const nuevoPago = this.pagoAbogadoRepository.create({
      ...data,
      fecha_operacion: new Date().toISOString(),
      estado: 'creado',
      monto: data.monto,
      trabajo,
      abogado: trabajo.aplicacion.abogado, // Ahora sí existe la relación
    });

    const pagoGuardado = await this.pagoAbogadoRepository.save(nuevoPago);
    return pagoGuardado;
  }
}