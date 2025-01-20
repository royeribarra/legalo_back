import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagosEntity } from './pago.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { TrabajosService } from '../trabajo/trabajo.service';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(PagosEntity) 
    private readonly pagoRepository: Repository<PagosEntity>,
    @InjectRepository(OfertasEntity) 
    private readonly ofertaRepository: Repository<OfertasEntity>,
    @InjectRepository(AplicacionesEntity)  private readonly aplicacionRepository: Repository<AplicacionesEntity>,
    private trabajoService: TrabajosService
  ) {}

  async realizarPagoOferta(
    clienteId: number,
    ofertaId: number,
    monto: number,
    operacion: string,
    aplicacionId: number,
  ): Promise<PagosEntity> {
    const oferta = await this.ofertaRepository.findOne({ where: { id: ofertaId } });
    if (!oferta) {
      throw new BadRequestException('La oferta no existe');
    }

    const aplicacion = await this.aplicacionRepository.findOne({ where: { id: aplicacionId } });
    if (!aplicacion) {
      throw new BadRequestException('La aplicacion no existe');
    }

    const nuevoPago = this.pagoRepository.create({
      clienteId,
      ofertaId,
      operacion,
      fecha_operacion: new Date().toISOString(),
      oferta,
      aplicacion
    });

    const pagoGuardado = await this.pagoRepository.save(nuevoPago);
    const bodyTrabajo = {
      estado: 1,
      fecha_inicio: new Date().toLocaleDateString(),
      fecha_fin: new Date().toLocaleDateString(),
      clienteId: clienteId
    };
    await this.trabajoService.crearTrabajoDesdeAplicacion(aplicacionId, bodyTrabajo);

    return pagoGuardado;
  }
}