import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AbogadoDTO, AbogadoUpdateDTO } from '../dto/abogado.dto';
import { ErrorManager } from '../../../utils/error.manager';
import { AbogadosEntity } from '../entities/abogados.entity';
import { EducacionesEntity } from '../../educacion/educaciones.entity';
import { EspecialidadesEntity } from '../../especialidad/especialidades.entity';
import { ExperienciasEntity } from '../../experiencia/experiencias.entity';
import { HabilidadesBlandaEntity } from '../../habilidadBlanda/habilidadesBlanda.entity';
import { HabilidadesDuraEntity } from '../../habilidadDura/habilidadesDura.entity';
import { IndustriasEntity } from '../../industria/industrias.entity';
import { ServiciosEntity } from '../../servicio/servicios.entity';
import { UsuariosService } from '../../usuario/usuario.service';
import { AbogadoMailService } from '../../mail/services/abogadoMail.service';
import { TempFilesService } from '../../tmp/tmpFile.service';
import { OfertasEntity } from '../../oferta/oferta.entity';
import { IndustriasAbogadoEntity } from '../../industria/industriaAbogado.entity';
import { EspecialidadesAbogadoEntity } from '../../especialidad/especialidadAbogado.entity';
import { In } from 'typeorm';
import { ServiciosAbogadoEntity } from '../../servicio/servicioAbogado.entity';
import { TmpImageFileEntity } from '../../tmp/tmpImgFile.entity';
import { AplicacionesEntity } from '../../aplicacion/aplicaciones.entity';

@Injectable()
export class AbogadosService{
  constructor(
    @InjectRepository(AbogadosEntity) private readonly abogadosRepository: Repository<AbogadosEntity>,
    @InjectRepository(EducacionesEntity) private readonly educacionesRepository: Repository<EducacionesEntity>,
    @InjectRepository(EspecialidadesEntity) private readonly especialidadesRepository: Repository<EspecialidadesEntity>,
    @InjectRepository(ExperienciasEntity) private readonly experienciaRepository: Repository<ExperienciasEntity>,

    @InjectRepository(IndustriasAbogadoEntity) private readonly industriaAbogadoRepository: Repository<IndustriasAbogadoEntity>,
    @InjectRepository(ServiciosAbogadoEntity) private readonly servicioAbogadoRepository: Repository<ServiciosAbogadoEntity>,
    @InjectRepository(EspecialidadesAbogadoEntity) private readonly especialidadAbogadoRepository: Repository<EspecialidadesAbogadoEntity>,

    @InjectRepository(HabilidadesBlandaEntity) private readonly habilidadBlandRepository: Repository<HabilidadesBlandaEntity>,
    @InjectRepository(HabilidadesDuraEntity) private readonly habilidadDurRepository: Repository<HabilidadesDuraEntity>,
    @InjectRepository(IndustriasEntity) private readonly industriaRepository: Repository<IndustriasEntity>,
    @InjectRepository(ServiciosEntity) private readonly servicioRepository: Repository<ServiciosEntity>,
    @InjectRepository(OfertasEntity) private readonly ofertaRepository: Repository<OfertasEntity>,
    @InjectRepository(TmpImageFileEntity) private readonly tmpFileRepository: Repository<TmpImageFileEntity>,
    @InjectRepository(AplicacionesEntity) private readonly aplicacionesRepository: Repository<AplicacionesEntity>,
    private readonly usuariosService: UsuariosService,
    private readonly abogadoMailService: AbogadoMailService,
    private readonly tempFilesService: TempFilesService
  ){}

  public async createAbogado(body: AbogadoDTO)
  {
    const abogadoExists = await this.findBy({
      key: 'correo',
      value: body.correo
    })

    if(abogadoExists)
    {
      return {
        state: false,
        message: `Ya existe un abogado registado con correo ${body.correo}`,
        usuario: null
      }
    }

    const abogadoExistsDni = await this.findBy({
      key: 'dni',
      value: body.dni
    })

    if(abogadoExistsDni)
    {
      return {
        state: false,
        message: `Ya existe un abogado registado con dni ${body.correo}`,
        usuario: null
      }
    }

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

    const habilidadesBlandas = body.habilidadesBlandas.map((habilidadDTO) => {
      const habilidad = new HabilidadesBlandaEntity();
      habilidad.nombre = habilidadDTO.nombre;
      return habilidad;
    });

    const habilidadesDuras = body.habilidadesDuras.map((habilidadDTO) => {
      const habilidad = new HabilidadesDuraEntity();
      habilidad.nombre = habilidadDTO.nombre;
      return habilidad;
    });

    try {
      const nuevoAbogado = new AbogadosEntity();
      nuevoAbogado.apellidos = body.apellidos;
      nuevoAbogado.direccion = body.direccion;
      nuevoAbogado.correo = body.correo;
      nuevoAbogado.grado_academico = body.grado_academico;
      nuevoAbogado.nombres = body.nombres;
      nuevoAbogado.sobre_ti = body.sobre_ti;
      nuevoAbogado.cip = body.cip;
      nuevoAbogado.colegio = body.colegio;
      nuevoAbogado.dni = body.dni;
      nuevoAbogado.telefono = body.telefono;

      nuevoAbogado.habilidadesBlandas = [];
      nuevoAbogado.habilidadesDuras = [];
      nuevoAbogado.industriasAbogado = [];
      nuevoAbogado.serviciosAbogado = [];
      nuevoAbogado.especialidadesAbogado = [];
      nuevoAbogado.foto_url = '';
      nuevoAbogado.cul_url = '';
      nuevoAbogado.cv_url = '';
      nuevoAbogado.video_url = '';

      const tempFileCv = await this.tempFilesService.getFileByNombreArchivo(body.correo, 'archivo_cv');
      if (tempFileCv) {
        // throw new BadRequestException('Archivo temporal no encontrado');
        nuevoAbogado.cv_url = tempFileCv.filePath;
      }

      const tempFileCul = await this.tempFilesService.getFileByNombreArchivo(body.correo, 'archivo_cul');
      if (tempFileCul) {
        // throw new BadRequestException('Archivo temporal no encontrado');
        nuevoAbogado.cul_url = tempFileCul.filePath;
      }

      const tempFileImagen = await this.tempFilesService.getFileByNombreArchivo(body.correo, 'archivo_imagen');
      if (tempFileImagen) {
        // throw new BadRequestException('Archivo temporal no encontrado');
        nuevoAbogado.foto_url = tempFileImagen.filePath;
      }

      const abogado : AbogadosEntity = await this.abogadosRepository.save(nuevoAbogado);

      for (const educacion of educaciones) {
        educacion.abogado = abogado;
      }

      // for (const especialidad of especialidades) {
      //   especialidad.abogado = abogado;
      // }
      const industrias = await this.industriaRepository.findBy({
        id: In(body.industrias),
      });
      const industriasAbogado = industrias.map((industria) => {
        const relacion = new IndustriasAbogadoEntity();
        relacion.abogado = abogado;
        relacion.industria = industria;
        return relacion;
      });

      const especialidades = await this.especialidadesRepository.findBy({
        id: In(body.especialidades),
      });
      const especialidadesAbogado = especialidades.map((especialidad) => {
        const relacion = new EspecialidadesAbogadoEntity();
        relacion.abogado = abogado;
        relacion.especialidad = especialidad;
        return relacion;
      });

      const servicios = await this.servicioRepository.findBy({
        id: In(body.servicios),
      });
      const serviciosAbogado = servicios.map((servicio) => {
        const relacion = new ServiciosAbogadoEntity();
        relacion.abogado = abogado;
        relacion.servicio = servicio;
        return relacion;
      });

      for (const experiencia of experiencias) {
        experiencia.abogado = abogado;
      }

      for (const habilidad of habilidadesBlandas) {
        habilidad.abogado = abogado;
      }

      for (const habilidad of habilidadesDuras) {
        habilidad.abogado = abogado;
      }

      await this.industriaAbogadoRepository.save(industriasAbogado);
      await this.especialidadAbogadoRepository.save(especialidadesAbogado);
      await this.servicioAbogadoRepository.save(serviciosAbogado);

      await this.educacionesRepository.save(educaciones);
      await this.experienciaRepository.save(experiencias);
      await this.habilidadDurRepository.save(habilidadesDuras);
      await this.habilidadBlandRepository.save(habilidadesBlandas);
      // await this.servicioRepository.save(servicios);
      // await this.industriaRepository.save(industrias);
      // await this.especialidadesRepository.save(especialidades);

      const datosUsuario = {
        nombres: body.nombres,
        apellidos: body.apellidos,
        correo: body.correo,
        contrasena: body.contrasena,
        dni: body.dni,
        telefono: body.telefono,
        perfil: "Abogado",
        abogadoId: abogado.id
      }
      const usuario = await this.usuariosService.createUsuario(datosUsuario);

      try {
        const { state } = await this.abogadoMailService.sendActivationEmail(body.correo, body.nombres, body.apellidos);
      } catch (error) {
        console.log("Error al enviar el mail.")
      }

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

  async updateAbogado(body: Partial<AbogadoUpdateDTO>, id: number): Promise<{ state: boolean, message: string }> {
    // Buscar el abogado por ID
    const abogado = await this.abogadosRepository.findOne({ where: { id } });

    // Si el abogado no existe, lanzamos una excepción
    if (!abogado) {
      return {
        state: false,
        message: `No existe el abogado con ID ${id} creado correctamente`,
      };
    }

    // Actualizamos los campos del abogado con los datos del DTO
    Object.assign(abogado, body);

    // Guardamos los cambios en la base de datos
    await this.abogadosRepository.save(abogado);

    return {
      state: true,
      message: 'Abogado actualizado correctamente',
    };
  }

  public async findAbogados(queryParams): Promise<AbogadosEntity[]>
  {
    const query = this.abogadosRepository.createQueryBuilder('abogados')
      .leftJoinAndSelect('abogados.habilidadesBlandas', 'habilidadesBlandas')
      .leftJoinAndSelect('abogados.habilidadesDuras', 'habilidadesDuras')
      .leftJoinAndSelect('abogados.industriasAbogado', 'industriasAbogado')
      .leftJoinAndSelect('industriasAbogado.industria', 'industria')
      .leftJoinAndSelect('abogados.serviciosAbogado', 'serviciosAbogado')
      .leftJoinAndSelect('serviciosAbogado.servicio', 'servicio')
      .leftJoinAndSelect('abogados.especialidadesAbogado', 'especialidadesAbogado')
      .leftJoinAndSelect('especialidadesAbogado.especialidad', 'especialidad')
      .leftJoinAndSelect('abogados.experiencias', 'experiencias')
      .leftJoinAndSelect('abogados.educaciones', 'educaciones')
      .leftJoinAndSelect('abogados.usuario', 'usuario')
      .leftJoinAndSelect('abogados.aplicaciones', 'aplicaciones')
      .leftJoinAndSelect('abogados.trabajos', 'trabajos');

    if (queryParams.validado_admin !== undefined) {
      query.andWhere('abogados.validado_admin = :validado_admin', {
        validado_admin: queryParams.validado_admin === 'true',
      });
    }
    try {
      const clientes: AbogadosEntity[] = await query.getMany();

      return clientes;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAbogadoById(id: number): Promise<AbogadosEntity>
  {
    try {
      const query = await this.abogadosRepository
        .createQueryBuilder('abogados')
        .leftJoinAndSelect('abogados.habilidadesBlandas', 'habilidadesBlandas')
        .leftJoinAndSelect('abogados.habilidadesDuras', 'habilidadesDuras')
        .leftJoinAndSelect('abogados.industriasAbogado', 'industriasAbogado')
        .leftJoinAndSelect('industriasAbogado.industria', 'industria')
        .leftJoinAndSelect('abogados.serviciosAbogado', 'serviciosAbogado')
        .leftJoinAndSelect('serviciosAbogado.servicio', 'servicio')
        .leftJoinAndSelect('abogados.especialidadesAbogado', 'especialidadesAbogado')
        .leftJoinAndSelect('especialidadesAbogado.especialidad', 'especialidad')
        .leftJoinAndSelect('abogados.experiencias', 'experiencias')
        .leftJoinAndSelect('abogados.educaciones', 'educaciones');

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

  public async findBy({key, value} : { key: keyof AbogadoDTO; value: any })
  {
    try {
      const abogado: AbogadosEntity = await this.abogadosRepository.createQueryBuilder(
        'abogados'
      )
      .where({[key]: value})
      .getOne();
      return abogado;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async obtenerAbogadosPorOferta(ofertaId: number): Promise<AbogadosEntity[]> {
    // Obtener la oferta por su ID
    const oferta = await this.ofertaRepository.findOne({
      where: { id: ofertaId },
      relations: ['servicios', 'especialidades', 'industrias'], // Relacionamos los servicios, especialidades e industrias de la oferta
    });

    if (!oferta) {
      throw new Error('Oferta no encontrada');
    }

    // Obtener abogados que tienen los mismos servicios, especialidades e industrias que la oferta
    const abogados = await this.abogadosRepository
      .createQueryBuilder('abogado')
      .leftJoinAndSelect('abogado.servicios', 'servicio')
      .leftJoinAndSelect('abogado.especialidades', 'especialidad')
      .leftJoinAndSelect('abogado.industrias', 'industria')
      .where('servicio.id IN (:...servicios)', { servicios: oferta.serviciosOferta.map(s => s.id) })
      .andWhere('especialidad.id IN (:...especialidades)', { especialidades: oferta.especialidadesOferta.map(e => e.id) })
      .andWhere('industria.id IN (:...industrias)', { industrias: oferta.industriasOferta.map(i => i.id) })
      .getMany();

    return abogados;
  }

  async updateArchivosAbogado(correo: string){
    try {
      const abogado = await this.findBy({ key: 'correo', value: correo });
      if(!abogado)
      {
        return {
          state: false,
          message: "No se encontró al abogado"
        };
      }

      const cv = await this.tmpFileRepository.createQueryBuilder('tmp').where('tmp.correo = :correo', { correo }).andWhere('tmp.nombre_archivo = :nombre_archivo', { nombre_archivo: 'archivo_cv' }).getOne();
      const cul = await this.tmpFileRepository.createQueryBuilder('tmp').where('tmp.correo = :correo', { correo }).andWhere('tmp.nombre_archivo = :nombre_archivo', { nombre_archivo: 'archivo_cul' }).getOne();
      const image = await this.tmpFileRepository.createQueryBuilder('tmp').where('tmp.correo = :correo', { correo }).andWhere('tmp.nombre_archivo = :nombre_archivo', { nombre_archivo: 'archivo_imagen' }).getOne();
      abogado.cv_url = cv.filePath;
      abogado.cul_url = cul.filePath;
      abogado.foto_url = image.filePath;

      // Guardar los cambios en la base de datos
      await this.abogadosRepository.save(abogado);
      return {
        state: true,
        message: "Archivos actualizados."
      };
    } catch (error) {
      console.log(error, "error en conductorService - findConductorbyId")
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async postularAbogadoOferta(
    abogadoId: number,
    ofertaId: number,
    salarioEsperado: number,
  ) {
    // Buscar el abogado por ID
    const abogado = await this.abogadosRepository.findOne({ where: { id: abogadoId } });
    if (!abogado) {
      return { state: 'error', message: 'El abogado no existe' };
    }

    // Buscar la oferta por ID
    const oferta = await this.ofertaRepository.findOne({ where: { id: ofertaId } });
    if (!oferta) {
      return { state: 'error', message: 'La oferta no existe' };
    }

    // Crear una nueva instancia de AplicacionesEntity
    const nuevaAplicacion = this.aplicacionesRepository.create({
      fecha_aplicacion: new Date().toISOString(),
      status: 1, // Ejemplo: Status inicial como "pendiente"
      salarioEsperado,
      abogado,
      oferta,
    });

    // Guardar la aplicación en la base de datos
    await this.aplicacionesRepository.save(nuevaAplicacion);

    return { state: 'success', message: 'Aplicación creada correctamente' };
  }
}