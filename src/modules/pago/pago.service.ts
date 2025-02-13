import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagosEntity } from './pago.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { TrabajosService } from '../trabajo/trabajo.service';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { PagoDTO } from './pago.dto';
import { TrabajosEntity } from '../trabajo/trabajos.entity';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(PagosEntity)
    private readonly pagoRepository: Repository<PagosEntity>,
    @InjectRepository(OfertasEntity)
    private readonly ofertaRepository: Repository<OfertasEntity>,
    @InjectRepository(AplicacionesEntity)  private readonly aplicacionRepository: Repository<AplicacionesEntity>,
    @InjectRepository(TrabajosEntity)  private readonly trabajoRepository: Repository<TrabajosEntity>,
    @InjectRepository(ClientesEntity)  private readonly clienteRepository: Repository<ClientesEntity>,
    @InjectRepository(AbogadosEntity)  private readonly abogadosRepository: Repository<AbogadosEntity>,
    private trabajoService: TrabajosService
  ) {}

  async realizarPago(data: PagoDTO): Promise<PagosEntity> {
    const {
      trabajoId,
      operacion,
      abogadoId,
      clienteId,
      direccionFactura,
      monto,
      nombreFactura,
      ruc,
      tipoComprobante,
      tipoPago
    } = data;

    // Validar si el trabajo existe
    const trabajo = await this.trabajoRepository.findOne({ where: { id: trabajoId } });
    if (!trabajo) {
      throw new BadRequestException('El trabajo no existe');
    }

    // Buscar cliente si se envió un clienteId
    let cliente = null;
    if (clienteId) {
      cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
      if (!cliente) {
        throw new BadRequestException('El cliente no existe');
      }
    }

    // Buscar abogado si se envió un abogadoId
    let abogado = null;
    if (abogadoId) {
      abogado = await this.abogadosRepository.findOne({ where: { id: abogadoId } });
      if (!abogado) {
        throw new BadRequestException('El abogado no existe');
      }
    }

    // Crear el pago asegurando que cliente y abogado sean opcionales
    const nuevoPago = this.pagoRepository.create({
      ...data,
      fecha_operacion: new Date().toISOString(), // Fecha actual en formato ISO
      trabajo,
      cliente, // Puede ser null si no se pasa clienteId
      abogado, // Puede ser null si no se pasa abogadoId
      monto_total: monto,
      estado: 'creado'
    });

    // Guardar en la base de datos
    return await this.pagoRepository.save(nuevoPago);
  }

  async realizarPagoOferta(data: PagoDTO): Promise<PagosEntity> {
    const { ofertaId, aplicacionId, operacion, abogadoId, clienteId, direccionFactura, monto, nombreFactura, ruc, tipoComprobante, tipoPago } = data;
    const aplicacion = await this.aplicacionRepository.findOne({ where: { id: aplicacionId } });
    if (!aplicacion) {
      throw new BadRequestException('La aplicacion no existe');
    }
    const nuevoPago = this.pagoRepository.create({
      ...data,
      fecha_operacion: new Date().toISOString(),
      estado: 'creado',
      monto_total: data.monto
    });

    const pagoGuardado = await this.pagoRepository.save(nuevoPago);
    return pagoGuardado;
  }
}