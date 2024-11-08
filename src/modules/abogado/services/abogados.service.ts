import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AbogadoDTO } from '../dto/abogado.dto';
import { ErrorManager } from '../../../utils/error.manager';
import { AbogadosEntity } from '../entities/abogados.entity';

@Injectable()
export class AbogadosService{
  constructor(
    @InjectRepository(AbogadosEntity) private readonly abogadosRespository: Repository<AbogadosEntity>
  ){}

  public async createAbogado(body: AbogadoDTO)
  {
    try {
      const nuevoAbogado = new AbogadosEntity();
      nuevoAbogado.apellidos = body.apellidos;
      nuevoAbogado.aplicaciones = [];
      nuevoAbogado.correo = body.correo;
      nuevoAbogado.cul_url = '';
      nuevoAbogado.direccion = body.direccion;
      nuevoAbogado.educaciones = [];
      nuevoAbogado.especialidades = [];
      nuevoAbogado.experiencias = [];
      nuevoAbogado.foto_url = '';
      nuevoAbogado.grado_academico = body.grado_academico;
      nuevoAbogado.habilidadesBlandas = [];
      nuevoAbogado.habilidadesDuras = [];
      nuevoAbogado.industrias = [];
      nuevoAbogado.nombres = body.nombres;
      nuevoAbogado.pdf_url = '';
      nuevoAbogado.servicios = [];
      nuevoAbogado.sobre_ti = body.sobre_ti;
      nuevoAbogado.trabajos = [];
      nuevoAbogado.video_url = '';
      const conductor : AbogadosEntity = await this.abogadosRespository.save(nuevoAbogado);
      
      return {
        state: true,
        message: `Conductor creado correctamente`,
        conductor: conductor
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}