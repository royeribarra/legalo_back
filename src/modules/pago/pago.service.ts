import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagosEntity } from './pago.entity';
import { OfertasEntity } from '../oferta/oferta.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(PagosEntity) 
    private readonly pagoRepository: Repository<PagosEntity>,

    @InjectRepository(OfertasEntity) 
    private readonly ofertaRepository: Repository<OfertasEntity>,
  ) {}

  async realizarPagoOferta(
    clienteId: number,
    ofertaId: number,
    monto: number,
    operacion: string
  ): Promise<PagosEntity> {
    const oferta = await this.ofertaRepository.findOne({ where: { id: ofertaId } });
    if (!oferta) {
      throw new BadRequestException('La oferta no existe');
    }

    const nuevoPago = this.pagoRepository.create({
      clienteId,
      ofertaId,
      operacion,
      fecha_operacion: new Date().toISOString(),
      oferta,
    });

    const pagoGuardado = await this.pagoRepository.save(nuevoPago);

    return pagoGuardado;
  }
}