import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AbogadoDTO } from '../dto/abogado.dto';
import { ErrorManager } from '../../../utils/error.manager';
import { AbogadosEntity } from '../entities/abogados.entity';
import { EducacionesEntity } from '../../../../src/modules/educacion/educaciones.entity';
import { EspecialidadesEntity } from '../../../../src/modules/especialidad/especialidades.entity';
import { ExperienciasEntity } from '../../../../src/modules/experiencia/experiencias.entity';
import { HabilidadesBlandaEntity } from '../../../../src/modules/habilidadBlanda/habilidadesBlanda.entity';
import { HabilidadesDuraEntity } from '../../../../src/modules/habilidadDura/habilidadesDura.entity';
import { IndustriasEntity } from '../../../../src/modules/industria/industrias.entity';
import { ServiciosEntity } from '../../../../src/modules/servicio/servicios.entity';
import { UsuariosService } from '../../../../src/modules/usuario/usuario.service';

@Injectable()
export class AbogadosService{
  constructor(
    @InjectRepository(AbogadosEntity) private readonly abogadosRespository: Repository<AbogadosEntity>,
    @InjectRepository(EducacionesEntity) private readonly educacionesRepository: Repository<EducacionesEntity>,
    @InjectRepository(EspecialidadesEntity) private readonly especialidadesRepository: Repository<EspecialidadesEntity>,
    @InjectRepository(ExperienciasEntity) private readonly experienciaRepository: Repository<ExperienciasEntity>,

    @InjectRepository(HabilidadesBlandaEntity) private readonly habilidadBlandRepository: Repository<HabilidadesBlandaEntity>,
    @InjectRepository(HabilidadesDuraEntity) private readonly habilidadDurRepository: Repository<HabilidadesDuraEntity>,
    @InjectRepository(IndustriasEntity) private readonly industriaRepository: Repository<IndustriasEntity>,
    @InjectRepository(ServiciosEntity) private readonly servicioRepository: Repository<ServiciosEntity>,
    private readonly usuariosService: UsuariosService,
  ){}

  public async createAbogado(body: AbogadoDTO)
  {
    const educaciones = body.educaciones.map((educacionDTO) => {
      const educacion = new EducacionesEntity();
      educacion.descripcion = educacionDTO.descripcion;
      educacion.fecha_fin = educacionDTO.fecha_fin;
      educacion.fecha_inicio = educacionDTO.fecha_inicio;
      educacion.institucion = educacionDTO.institucion;
      educacion.titulo = educacionDTO.titulo;
      educacion.ubicacion = educacionDTO.ubicacion;
      educacion.abogado = null;
      return educacion;
    });

    const experiencias = body.experiencias.map((expienciaDTO) => {
      const experiencia = new ExperienciasEntity();
      experiencia.descripcion = expienciaDTO.descripcion;
      experiencia.fecha_fin = expienciaDTO.fecha_fin;
      experiencia.fecha_inicio = expienciaDTO.fecha_inicio;
      experiencia.institucion = expienciaDTO.institucion;
      experiencia.titulo = expienciaDTO.titulo;
      experiencia.abogado = null;
      return experiencia;
    });

    const especialidades = body.especialidades.map((especialidadDTO) => {
      const especialidad = new EspecialidadesEntity();
      especialidad.nombre = especialidadDTO.nombre;
      return especialidad;
    });

    const habilidadesBlandas = body.habilidadesBlandas.map((habilidadDTO) => {
      const habilidad = new EspecialidadesEntity();
      habilidad.nombre = habilidadDTO.nombre;
      return habilidad;
    });

    const habilidadesDuras = body.habilidadesDuras.map((habilidadDTO) => {
      const habilidad = new EspecialidadesEntity();
      habilidad.nombre = habilidadDTO.nombre;
      return habilidad;
    });

    const industrias = body.industrias.map((industriaDTO) => {
      const especialidad = new EspecialidadesEntity();
      especialidad.nombre = industriaDTO.nombre;
      return especialidad;
    });

    const servicios = body.servicios.map((servicioDTO) => {
      const especialidad = new EspecialidadesEntity();
      especialidad.nombre = servicioDTO.nombre;
      return especialidad;
    });

    try {
      const nuevoAbogado = new AbogadosEntity();
      nuevoAbogado.apellidos = body.apellidos;
      nuevoAbogado.direccion = body.direccion;
      nuevoAbogado.correo = body.correo;
      nuevoAbogado.grado_academico = body.grado_academico;
      nuevoAbogado.nombres = body.nombres;
      nuevoAbogado.sobre_ti = body.sobre_ti;
      
      nuevoAbogado.habilidadesBlandas = [];
      nuevoAbogado.habilidadesDuras = [];
      nuevoAbogado.industrias = [];
      nuevoAbogado.servicios = [];
      nuevoAbogado.foto_url = '';
      nuevoAbogado.cul_url = '';
      nuevoAbogado.pdf_url = '';
      nuevoAbogado.video_url = '';

      const abogado : AbogadosEntity = await this.abogadosRespository.save(nuevoAbogado);

      for (const educacion of educaciones) {
        educacion.abogado = abogado;
      }

      for (const especialidad of especialidades) {
        especialidad.abogado = abogado;
      }

      for (const experiencia of experiencias) {
        experiencia.abogado = abogado;
      }

      for (const habilidad of habilidadesBlandas) {
        habilidad.abogado = abogado;
      }

      for (const habilidad of habilidadesDuras) {
        habilidad.abogado = abogado;
      }

      for (const servicio of servicios) {
        servicio.abogado = abogado;
      }

      for (const industria of industrias) {
        industria.abogado = abogado;
      }
      
  
      await this.educacionesRepository.save(educaciones);
      await this.especialidadesRepository.save(especialidades);
      await this.experienciaRepository.save(experiencias);

      await this.habilidadDurRepository.save(habilidadesDuras);
      await this.habilidadBlandRepository.save(habilidadesBlandas);
      await this.servicioRepository.save(servicios);
      await this.industriaRepository.save(industrias);

      const datosUsuario = {
        nombres: body.nombres,
        apellidos: body.apellidos,
        correo: body.correo,
        contrasena: body.contrasena,
        dni: body.direccion,
        telefono: body.telefono,
        perfil: "Abogado",
        abogadoId: abogado.id
      }
      const usuario = await this.usuariosService.createUsuario(datosUsuario);

      return {
        state: true,
        message: `Abogado creado correctamente`,
        abogado: abogado,
        usuario: usuario
      }
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAbogadoById(id: number): Promise<AbogadosEntity>
  {
    try {
      const query = await this.abogadosRespository
        .createQueryBuilder('abogados')
        .leftJoinAndSelect('abogados.habilidadesBlandas', 'habilidadesBlandas')
        .leftJoinAndSelect('abogados.habilidadesDuras', 'habilidadesDuras')
        .leftJoinAndSelect('abogados.industrias', 'industrias')
        .leftJoinAndSelect('abogados.servicios', 'servicios')
        .leftJoinAndSelect('abogados.experiencias', 'experiencias')
        .leftJoinAndSelect('abogados.educaciones', 'educaciones')
        .leftJoinAndSelect('abogados.especialidades', 'especialidades');

        query.where('abogados.id = :id', { id });
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
}