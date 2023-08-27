import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { SolicitudDTO, SolicitudUpdateDTO } from '../dto/solicitud.dto';
import { ErrorManager } from '../../../../utils/error.manager';
import { SolicitudesEntity } from '../entities/solicitudes.entity';
import { MailService } from '../../../mail/services/mail.service';
import { TrackerEntity } from '../../tracker/entities/tracker.entity';
import { TrackerDTO } from '../../tracker/dto/tracker.dto';
import { ResiduosRecojoEntity } from '../../residuosRecojo/entities/residuosRecojo.entity';
import { ClientesService } from '../../clientes/services/clientes.service';
import { SucursalesClienteService } from '../../sucursalesCliente/services/sucursalesCliente.service';

@Injectable()
export class SolicitudesService{
  constructor(
    @InjectRepository(SolicitudesEntity) private readonly solicitudRespository: Repository<SolicitudesEntity>,
    @InjectRepository(ResiduosRecojoEntity) private readonly residuoRecojoRepository: Repository<ResiduosRecojoEntity>,
    @InjectRepository(TrackerEntity) private readonly trackerRepository: Repository<TrackerEntity>,
    private readonly clienteService: ClientesService,
    private readonly sucursalService: SucursalesClienteService,
    private mailService: MailService
  ){}

  public async createSolicitud(body: SolicitudDTO, tracker: TrackerDTO)
  {
    try {
      const cliente = await this.clienteService.findClienteById(body.clienteId);
      const sucursal = await this.sucursalService.findSucursalById(body.sucursalId);
      const lastRecord = await this.solicitudRespository.createQueryBuilder('solicitudes')
        .orderBy('solicitudes.id', 'DESC')
        .getOne();

      const residuosRecojo = await Promise.all(
        body.residuos.map(async (residuoRecojoDto) => {
          const residuoRecojo = new ResiduosRecojoEntity();
          residuoRecojo.cantidad = residuoRecojoDto.cantidad;
          residuoRecojo.residuo = residuoRecojoDto.tipoResiduo;
          residuoRecojo.unidadMedida = residuoRecojoDto.unidadMedida;
          return await this.residuoRecojoRepository.save(residuoRecojo);
        }),
      );

      const solicitudBody = {
        ...body,
        codigo: 'COPTR-'+(lastRecord ? lastRecord.id+1 : 1),
        tracker: tracker,
        residuosRecojo: residuosRecojo,
        cliente: cliente,
        sucursal: sucursal
      };

      const solicitud : SolicitudesEntity = await this.solicitudRespository.save(solicitudBody);

      return {
        state: true,
        message: "Su solicitud de recojo fue registrada con éxito, nuestro equipo se comunicará con usted.",
        solicitud: solicitud
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findSolicitudes(queryParams): Promise<SolicitudesEntity[]>
  {
    const query = this.solicitudRespository.createQueryBuilder('solicitudes')
      .leftJoinAndSelect('solicitudes.cliente', 'cliente')
      .leftJoinAndSelect('solicitudes.sucursal', 'sucursal')
      .leftJoinAndSelect('solicitudes.residuosRecojo', 'residuosRecojo');

    if (queryParams.estadoSolicitud) {
      query.andWhere('solicitudes.estadoSolicitud = :estadoSolicitud', { estadoSolicitud: queryParams.estadoSolicitud });
    }

    try {
      const solicitudes: SolicitudesEntity[] = await query.getMany();
      
      return solicitudes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findSolicitudesBy(): Promise<SolicitudesEntity[]>
  {
    try {
      const solicitudes : SolicitudesEntity[] = await this.solicitudRespository.find();
      
      return solicitudes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findSolicitudById(id: string): Promise<SolicitudesEntity>
  {
    try {
      const roles : SolicitudesEntity =  await this.solicitudRespository
        .createQueryBuilder('roles')
        .where({id})
        .getOne();

        if(!roles)
        {
          throw new ErrorManager({
            type: 'BAD_REQUEST',
            message: `No se encontró al usuario de Id = ${id}`
          });
        }

        return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateSolicitud(body, id: string): Promise<UpdateResult> | undefined
  {
    try {
      const roles: UpdateResult = await this.solicitudRespository.update(id, body);
      if(roles.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar el usuario.'
        });
      }
      return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteSolicitud(id: string): Promise<DeleteResult> | undefined
  {
    try {
      const roles: DeleteResult = await this.solicitudRespository.delete(id);
      if(roles.affected === 0)
      {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar el usuario, porque no existe.'
        });
      }
      return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async sendEmailConfirmation(){
    try {
      await this.mailService.sendUserConfirmation();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findSolicitudesByClienteIdBySucursalId(clienteId: string, sucursalId: string): Promise<SolicitudesEntity[]>
  {
    try {
      const solicitudes : SolicitudesEntity[] = await this.solicitudRespository
        .createQueryBuilder('solicitudes')
        .innerJoinAndSelect('solicitudes.tracker', 'tracker')
        .leftJoinAndSelect('tracker.etapas', 'etapas')
        .where({
          empresaSolicitante: clienteId,
          sucursalEmpresaSolicitante: sucursalId
        })
        .getMany();
      
      return solicitudes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}