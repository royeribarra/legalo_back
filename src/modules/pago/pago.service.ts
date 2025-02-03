import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagosEntity } from './pago.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { TrabajosService } from '../trabajo/trabajo.service';
import { AplicacionesEntity } from '../aplicacion/aplicaciones.entity';
import { PagoDTO } from './pago.dto';

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

  async realizarPagoOferta(data: PagoDTO): Promise<PagosEntity> {
    const { ofertaId, aplicacionId, operacion, abogadoId, clienteId, direccionFactura, monto, nombreFactura, ruc, tipoComprobante, tipoPago } = data;
    const oferta = await this.ofertaRepository.findOne({ where: { id: ofertaId } });
    if (!oferta) {
      throw new BadRequestException('La oferta no existe');
    }
  
    // Actualizar el estado de la oferta
    oferta.estado = 'asignado';
    await this.ofertaRepository.save(oferta);
  
    // Validar y actualizar la aplicación aceptada
    const aplicacionAceptada = await this.aplicacionRepository.findOne({ where: { id: aplicacionId } });
    if (!aplicacionAceptada) {
      throw new BadRequestException('La aplicación no existe');
    }
  
    aplicacionAceptada.estado = 'aceptado';
    await this.aplicacionRepository.save(aplicacionAceptada);
  
    // Actualizar el estado de las demás aplicaciones a 'cerrada'
    await this.aplicacionRepository
      .createQueryBuilder('aplicaciones')
      .leftJoin('aplicaciones.oferta', 'oferta') // Realiza el join con la relación `oferta`
      .update(AplicacionesEntity)
      .set({ estado: 'cerrado' })
      .where('oferta.id = :ofertaId', { ofertaId }) // Filtra por la relación `oferta`
      .andWhere('aplicaciones.id != :aplicacionId', { aplicacionId }) // Excluye la aplicación aceptada
      .execute();
  
    // Crear y guardar el pago
    // const nuevoPago = this.pagoRepository.create({
    //   clienteId,
    //   ofertaId,
    //   operacion,
    //   fecha_operacion: new Date().toISOString(),
    //   oferta,
    //   aplicacion: aplicacionAceptada,
    // });

    const nuevoPago = this.pagoRepository.create({
      ...data,
      fecha_operacion: new Date().toISOString(),
      aplicacion: aplicacionAceptada,
    });
  
    const pagoGuardado = await this.pagoRepository.save(nuevoPago);
  
    // Crear el trabajo asociado
    const bodyTrabajo = {
      estado: 'creada',
      fecha_inicio: new Date().toLocaleDateString(),
      fecha_fin: new Date().toLocaleDateString(),
      clienteId: clienteId,
    };
    await this.trabajoService.crearTrabajoDesdeAplicacion(aplicacionId, bodyTrabajo);
  
    return pagoGuardado;
  }

  
}