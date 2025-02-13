import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagosEntity } from './pago.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { TrabajosService } from '../trabajo/trabajo.service';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { PagoDTO } from './pago.dto';
import { TrabajosEntity } from '../trabajo/trabajos.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(PagosEntity) 
    private readonly pagoRepository: Repository<PagosEntity>,
    @InjectRepository(OfertasEntity) 
    private readonly ofertaRepository: Repository<OfertasEntity>,
    @InjectRepository(AplicacionesEntity)  private readonly aplicacionRepository: Repository<AplicacionesEntity>,
    @InjectRepository(TrabajosEntity)  private readonly trabajoRepository: Repository<TrabajosEntity>,
    private trabajoService: TrabajosService
  ) {}

  async realizarPago(data: PagoDTO): Promise<PagosEntity> {
    const { trabajoId, aplicacionId, operacion, abogadoId, clienteId, direccionFactura, monto, nombreFactura, ruc, tipoComprobante, tipoPago } = data;
    const trabajo = await this.trabajoRepository.findOne({ where: { id: trabajoId } });
    if (!trabajo) {
      throw new BadRequestException('El trabajo no existe');
    }

    const aplicacion = await this.aplicacionRepository.findOne({ where: { id: aplicacionId } });
    if (!aplicacion) {
      throw new BadRequestException('La aplicacion no existe');
    }
    const nuevoPago = this.pagoRepository.create({
      ...data,
      fecha_operacion: new Date().toISOString(),
      trabajo: trabajo,
      estado: 'creado'
    });

    const pagoGuardado = await this.pagoRepository.save(nuevoPago);
    return pagoGuardado;
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
      estado: 'creado'
    });

    const pagoGuardado = await this.pagoRepository.save(nuevoPago);
    return pagoGuardado;
  }
}