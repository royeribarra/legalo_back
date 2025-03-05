import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from '../../utils/error.manager';
import { ServiciosEntity } from './servicios.entity';
import { OfertasEntity } from '../oferta/oferta.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';

@Injectable()
export class ServicioService{
  constructor(
    @InjectRepository(ServiciosEntity) private readonly servicioRepository: Repository<ServiciosEntity>,
    @InjectRepository(OfertasEntity) private readonly ofertaRepository: Repository<OfertasEntity>,
    @InjectRepository(AbogadosEntity) private readonly abogadoRepository: Repository<AbogadosEntity>
  ){}

  public async findServicios(queryParams): Promise<ServiciosEntity[]>
  {
    const query = this.servicioRepository.createQueryBuilder('servicios');
    try {
      const clientes: ServiciosEntity[] = await query.getMany();
      
      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findServicioById(id: number): Promise<ServiciosEntity>
  {
    try {
      const query = await this.servicioRepository
        .createQueryBuilder('servicios')
        .leftJoinAndSelect('servicios.serviciosAbogado', 'serviciosAbogado')
        .leftJoinAndSelect('servicios.serviciosOferta', 'serviciosOferta');

        query.where('servicios.id = :id', { id });
        console.log(query.getQuery());

        const abogado = await query.getOne();
        if(!abogado)
        {
          return null;
        }

        return abogado;
    } catch (error) {
      console.log(error, "error en conductorService - findConductorbyId")
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async getEstadisticas() {
    try {
      // Contar cuántas ofertas están asociadas a cada servicio
      const serviciosEstadisticas = await this.servicioRepository
        .createQueryBuilder("servicio")
        .leftJoin("servicio.serviciosOferta", "serviciosOferta")
        .leftJoin("serviciosOferta.oferta", "oferta")
        .leftJoin("servicio.serviciosAbogado", "serviciosAbogado")
        .leftJoin("serviciosAbogado.abogado", "abogado")
        .select([
          "servicio.nombre AS nombre",
          "COALESCE(COUNT(DISTINCT oferta.id), 0) AS total_ofertas",
          "COALESCE(COUNT(DISTINCT abogado.id), 0) AS total_abogados"
        ])
        .groupBy("servicio.nombre")
        .orderBy("total_ofertas", "DESC")
        .addOrderBy("total_abogados", "DESC")
        .getRawMany();

      const serviciosOfertas = await this.ofertaRepository
        .createQueryBuilder("oferta")
        .leftJoin("oferta.serviciosOferta", "serviciosOferta")
        .leftJoin("serviciosOferta.servicio", "servicio")
        .select("servicio.nombre, COUNT(oferta.id) as total_ofertas")
        .groupBy("servicio.nombre")
        .orderBy("total_ofertas", "DESC")
        .getRawMany();

      // Contar cuántos abogados han registrado cada servicio
      const serviciosAbogados = await this.abogadoRepository
        .createQueryBuilder("abogado")
        .leftJoin("abogado.serviciosAbogado", "serviciosAbogado")
        .leftJoin("serviciosAbogado.servicio", "servicio")
        .select("servicio.nombre, COUNT(abogado.id) as total_abogados")
        .groupBy("servicio.nombre")
        .orderBy("total_abogados", "DESC")
        .getRawMany();

      return {
        serviciosOfertas,
        serviciosAbogados,
        serviciosEstadisticas
      };
    } catch (error) {
      console.error("Error en getEstadisticas:", error);
      throw new Error("Error obteniendo estadísticas"); // Lanza el error para que Nest.js lo capture
    }
  }

}