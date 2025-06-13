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
import { OfertasEntity } from '../../oferta/oferta.entity';
import { IndustriasAbogadoEntity } from '../../industria/industriaAbogado.entity';
import { EspecialidadesAbogadoEntity } from '../../especialidad/especialidadAbogado.entity';
import { In } from 'typeorm';
import { ServiciosAbogadoEntity } from '../../servicio/servicioAbogado.entity';
import { FileEntity } from '../../tmp/file.entity';
import { AplicacionesEntity } from '../../aplicacion/aplicaciones.entity';
import { TrabajosEntity } from '../../trabajo/trabajos.entity';
import { UsuariosEntity } from '../../usuario/usuarios.entity';
import { RolEnum } from '../../usuario/roles.enum';
import { PreguntasOfertaEntity } from '../../preguntas_oferta/preguntasOferta.entity';
import { RespuestasOfertaEntity } from '../../preguntas_oferta/respuestasOferta.entity';
import { UpdateExperienciaDTO } from '../../experiencia/experiencia.dto';
import { UpdateEducacionDTO } from 'src/modules/educacion/educacion.dto';

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
    @InjectRepository(FileEntity) private readonly tmpFileRepository: Repository<FileEntity>,
    @InjectRepository(AplicacionesEntity) private readonly aplicacionesRepository: Repository<AplicacionesEntity>,
    @InjectRepository(TrabajosEntity) private readonly trabajosRepository: Repository<TrabajosEntity>,
    @InjectRepository(UsuariosEntity) private readonly usuarioRepository: Repository<UsuariosEntity>,
    @InjectRepository(PreguntasOfertaEntity) private readonly preguntasOfertaRepository: Repository<PreguntasOfertaEntity>,
    @InjectRepository(RespuestasOfertaEntity) private readonly respuestasOfertaRepository: Repository<RespuestasOfertaEntity>,
    private readonly usuariosService: UsuariosService
  ){}

  public async createAbogado(body: AbogadoDTO)
  {
    const abogadoExists = await this.findBy({
      key: 'correo',
      value: body.correo
    });
    const usuarioExistsCorreo = await this.usuarioRepository
      .createQueryBuilder('usuarios')
      .where('usuarios.correo = :correo', { correo: body.correo })
      .getOne();
    if(abogadoExists || usuarioExistsCorreo)
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
    });
    const usuarioExistsDni = await this.usuarioRepository
    .createQueryBuilder('usuarios')
    .where('usuarios.dni = :dni', { dni: body.dni })
    .getOne();
    if(abogadoExistsDni || usuarioExistsDni)
    {
      return {
        state: false,
        message: `Ya existe un abogado registado con dni ${body.dni}`,
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
      nuevoAbogado.ruc = body.ruc;
      nuevoAbogado.telefono = body.telefono;
      nuevoAbogado.objetivo = body.objetivo;

      nuevoAbogado.habilidadesBlandas = [];
      nuevoAbogado.habilidadesDuras = [];
      nuevoAbogado.industriasAbogado = [];
      nuevoAbogado.serviciosAbogado = [];
      nuevoAbogado.especialidadesAbogado = [];

      const abogado : AbogadosEntity = await this.abogadosRepository.save(nuevoAbogado);

      for (const educacion of educaciones) {
        educacion.abogado = abogado;
      }

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

      const datosUsuario = {
        nombres: body.nombres,
        apellidos: body.apellidos,
        correo: body.correo,
        contrasena: body.contrasena,
        dni: body.dni,
        telefono: body.telefono,
        rol: RolEnum.ABOGADO,
        abogadoId: abogado.id
      }
      const usuario = await this.usuariosService.createUsuario(datosUsuario);

      // try {
      //   const { state } = await this.abogadoMailService.sendActivationEmail(body.correo, body.nombres, body.apellidos);
      // } catch (error) {
      //   console.log("Error al enviar el mail.")
      // }

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
    const abogado = await this.abogadosRepository.findOne({ where: { id }, relations: ['serviciosAbogado', 'especialidadesAbogado', 'habilidadesBlandas', 'habilidadesDuras', 'industriasAbogado'] });

    // Si el abogado no existe, lanzamos una excepción
    if (!abogado) {
      return {
        state: false,
        message: `No existe el abogado con ID ${id}`,
      };
    }

    // Actualizamos los campos del abogado con los valores proporcionados en el body
    Object.assign(abogado, body);

    // Si se pasan nuevos servicios, eliminamos los anteriores y los volvemos a crear
    if (body.serviciosAbogado) {
      // Eliminar los servicios existentes
      await this.servicioAbogadoRepository.delete({ abogado: {id} });

      // Crear los nuevos servicios
      const nuevosServicios = body.serviciosAbogado.map((servicioId) =>
        this.servicioAbogadoRepository.create({ abogado, servicio: { id: servicioId } })
      );
      abogado.serviciosAbogado =  await this.servicioAbogadoRepository.save(nuevosServicios);
    }

    if (body.especialidadesAbogado) {
      // Eliminar los servicios existentes
      await this.especialidadAbogadoRepository.delete({ abogado: {id} });

      // Crear los nuevos servicios
      const nuevasEsecialidades = body.especialidadesAbogado.map((especialidadId) =>
        this.especialidadAbogadoRepository.create({ abogado, especialidad: { id: especialidadId } })
      );
      abogado.especialidadesAbogado =  await this.especialidadAbogadoRepository.save(nuevasEsecialidades);
    }

    await this.abogadosRepository.save(abogado);

    return {
      state: true,
      message: 'Abogado actualizado correctamente',
    };
  }

  async updateExperiencia(
    experienciaId: number,
    body: Partial<UpdateExperienciaDTO>
  ): Promise<{ state: boolean; message: string }> {
    const experiencia = await this.experienciaRepository.findOne({ where: { id: experienciaId } });
    if (!experiencia) {
      return {
        state: false,
        message: `No se encontró la experiencia con ID ${experienciaId}`,
      };
    }
    Object.assign(experiencia, body);
    await this.experienciaRepository.save(experiencia);

    return {
      state: true,
      message: 'Experiencia actualizada correctamente',
    };
  }

  async deleteExperiencia(experienciaId: number): Promise<{ state: boolean; message: string }> {
    const experiencia = await this.experienciaRepository.findOne({ where: { id: experienciaId } });
    if (!experiencia) {
      return {
        state: false,
        message: `No se encontró la experiencia con ID ${experienciaId}`,
      };
    }
    await this.experienciaRepository.remove(experiencia);

    return {
      state: true,
      message: 'Experiencia eliminada correctamente',
    };
  }

  async updateEstudio(
    educacionId: number,
    body: Partial<UpdateEducacionDTO>
  ): Promise<{ state: boolean; message: string }> {
    const educacion = await this.educacionesRepository.findOne({ where: { id: educacionId } });
    if (!educacion) {
      return {
        state: false,
        message: `No se encontró la educación con ID ${educacionId}`,
      };
    }
    Object.assign(educacion, body);
    await this.educacionesRepository.save(educacion);

    return {
      state: true,
      message: 'Educación actualizada correctamente',
    };
  }

  async deleteEstudio(educacionId: number): Promise<{ state: boolean; message: string }> {
    const educacion = await this.educacionesRepository.findOne({ where: { id: educacionId } });
    if (!educacion) {
      return {
        state: false,
        message: `No se encontró la educación con ID ${educacionId}`,
      };
    }
    await this.educacionesRepository.remove(educacion);

    return {
      state: true,
      message: 'Educación eliminada correctamente',
    };
  }

  public async findAbogados(queryParams): Promise<AbogadosEntity[]>
  {
    const query = this.abogadosRepository.createQueryBuilder('abogados')
      .leftJoinAndSelect('abogados.industriasAbogado', 'industriasAbogado')
      .leftJoinAndSelect('industriasAbogado.industria', 'industria')
      .leftJoinAndSelect('abogados.serviciosAbogado', 'serviciosAbogado')
      .leftJoinAndSelect('serviciosAbogado.servicio', 'servicio')
      .leftJoinAndSelect('abogados.especialidadesAbogado', 'especialidadesAbogado')
      .leftJoinAndSelect('especialidadesAbogado.especialidad', 'especialidad')
      .leftJoinAndSelect('abogados.usuario', 'usuario')
      .leftJoinAndSelect('abogados.files', 'files');

    if (queryParams.validadoAdmin !== undefined) {
      const validadoAdmin = queryParams.validadoAdmin === 'true';
      query.andWhere('abogados.validado_admin = :validado_admin', {
        validado_admin: validadoAdmin,
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
        .leftJoinAndSelect('abogados.educaciones', 'educaciones')
        .leftJoinAndSelect('abogados.files', 'files');

        query.where('abogados.id = :id', { id });

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

  public async newFindAbogadoById(id: number): Promise<AbogadosEntity>
  {
    try {
      const query = await this.abogadosRepository
        .createQueryBuilder('abogados')
        .leftJoinAndSelect('abogados.habilidadesBlandas', 'habilidadesBlandas')
        .addSelect(['habilidadesBlandas.id', 'habilidadesBlandas.nombre']) // solo selecciona el campo `nombre` de habilidades blandas
        .leftJoinAndSelect('abogados.habilidadesDuras', 'habilidadesDuras')
        .addSelect(['habilidadesBlandas.id', 'habilidadesDuras.nombre']) // solo selecciona el campo `nombre` de habilidades duras
        .leftJoinAndSelect('abogados.industriasAbogado', 'industriasAbogado')
        .leftJoinAndSelect('industriasAbogado.industria', 'industria')
        .addSelect(['industria.id', 'industria.nombre']) // solo selecciona el campo `nombre` de la industria
        .leftJoinAndSelect('abogados.serviciosAbogado', 'serviciosAbogado')
        .leftJoinAndSelect('serviciosAbogado.servicio', 'servicio')
        .addSelect(['servicio.id', 'servicio.nombre']) // solo selecciona el campo `nombre` del servicio
        .leftJoinAndSelect('abogados.especialidadesAbogado', 'especialidadesAbogado')
        .leftJoinAndSelect('especialidadesAbogado.especialidad', 'especialidad')
        .addSelect(['especialidad.id', 'especialidad.nombre']) // solo selecciona el campo `nombre` de la especialidad
        .leftJoinAndSelect('abogados.experiencias', 'experiencias')
        .leftJoinAndSelect('abogados.educaciones', 'educaciones')
        .leftJoinAndSelect('abogados.files', 'files')
        .where('abogados.id = :id', { id });

        query.where('abogados.id = :id', { id });

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

  public async postularAbogadoOferta(
    abogadoId: number,
    ofertaId: number,
    salarioEsperado: number,
    respuestas: any,
    numeroCuenta: string,
    selectedBanco: string,
    numeroCuentaCci: string
  ) {
    const abogado = await this.abogadosRepository.findOne({ where: { id: abogadoId } });
    if (!abogado) {
      return { state: false, message: 'El abogado no existe' };
    }

    // Buscar la oferta por ID
    const oferta = await this.ofertaRepository.findOne({ where: { id: ofertaId } });
    if (!oferta) {
      return { state: false, message: 'La oferta no existe' };
    }

    if (!oferta) {
      return { state: false, message: 'La oferta no existe' };
    }

    oferta.estado = 'verificar_postulaciones';
    await this.ofertaRepository.save(oferta);

    // Crear una nueva instancia de AplicacionesEntity
    const nuevaAplicacion = this.aplicacionesRepository.create({
      fecha_aplicacion: new Date().toISOString(),
      estado: "pendiente",
      salarioEsperado,
      abogado,
      oferta,
      numeroCuenta,
      selectedBanco,
      numeroCuentaCci
    });

    // Guardar la aplicación en la base de datos
    const aplicacion = await this.aplicacionesRepository.save(nuevaAplicacion);
    await this.actualizarRespuestas(ofertaId, aplicacion.id, respuestas);

    return { state: true, message: 'Aplicación creada correctamente', aplicacionId: aplicacion.id };
  }

  async actualizarRespuestas(ofertaId: number, aplicacionId: number, respuestas: any) {
    // Obtener las preguntas relacionadas con la oferta
    const preguntasOferta = await this.preguntasOfertaRepository.find({
      where: { oferta: { id: ofertaId } }
    });

    // Obtener la aplicación
    const aplicacion = await this.aplicacionesRepository.findOne({
      where: { id: aplicacionId },
      relations: ['respuestas_oferta'],
    });

    if (!aplicacion) {
      throw new Error('Aplicación no encontrada');
    }

    // Mapear y guardar las respuestas
    const respuestasActualizadas = respuestas.map(async (respuesta) => {
      const pregunta = preguntasOferta
        .find(pregunta => pregunta.id === respuesta.idPregunta);

      if (!pregunta) {
        throw new Error('Pregunta no encontrada');
      }

      // Crear la entidad RespuestasOferta
      const respuestaOferta = new RespuestasOfertaEntity();
      respuestaOferta.pregunta = pregunta;
      respuestaOferta.respuesta = respuesta.respuesta;
      respuestaOferta.aplicacion = aplicacion;

      return respuestaOferta;
    });

    await this.respuestasOfertaRepository.save(await Promise.all(respuestasActualizadas));
  }

  public async getOfertasConInvitacionesPorCliente(abogadoId: number): Promise<OfertasEntity[]> {
    const cliente = await this.abogadosRepository.findOne({
      where: { id: abogadoId },
      relations: [
        'invitaciones',
        'invitaciones.oferta',
        'invitaciones.oferta.industriasOferta',
        'invitaciones.oferta.serviciosOferta',
        'invitaciones.oferta.especialidadesOferta',
        'invitaciones.oferta.cliente',
        'invitaciones.oferta.aplicaciones',
        'invitaciones.oferta.industriasOferta.industria',
        'invitaciones.oferta.serviciosOferta.servicio',
        'invitaciones.oferta.especialidadesOferta.especialidad',
      ],
    });
  
    if (!cliente) {
      throw new Error('No se encontró un cliente con el ID proporcionado');
    }
  
    // Extraer ofertas desde las invitaciones
    const ofertas = cliente.invitaciones
      // .filter((invitacion) => invitacion.aceptada)
      .map((invitacion) => invitacion.oferta);
  
    return ofertas;
  }

  public async getAplicaciones(
      abogadoId: number,
      estado?: string
  ): Promise<AplicacionesEntity[]> 
  {
    const query = this.aplicacionesRepository
        .createQueryBuilder('aplicacion')
        .leftJoinAndSelect('aplicacion.oferta', 'oferta')
        .leftJoinAndSelect('oferta.industriasOferta', 'industriasOferta')
        .leftJoinAndSelect('oferta.serviciosOferta', 'serviciosOferta')
        .leftJoinAndSelect('oferta.especialidadesOferta', 'especialidadesOferta')
        .leftJoinAndSelect('oferta.cliente', 'cliente')
        .leftJoinAndSelect('oferta.aplicaciones', 'aplicaciones')
        .leftJoinAndSelect('industriasOferta.industria', 'industria')
        .leftJoinAndSelect('serviciosOferta.servicio', 'servicio')
        .leftJoinAndSelect('especialidadesOferta.especialidad', 'especialidad')
        // Utilizamos la relación con 'abogado'
        .leftJoinAndSelect('aplicacion.abogado', 'abogado')
        .where('abogado.id = :abogadoId', { abogadoId });

    if (estado) {
      query.andWhere('aplicacion.estado = :estado', { estado });
    }

    // Ejecutamos la consulta
    const aplicaciones = await query.getMany();

    return aplicaciones;
  }

  public async getTrabajos(
    abogadoId: number,
    estado?: string
  ): Promise<TrabajosEntity[]>
  {
    const query = this.trabajosRepository
        .createQueryBuilder('trabajo')
        .leftJoinAndSelect('trabajo.aplicacion', 'aplicacion')
        .leftJoinAndSelect('aplicacion.oferta', 'oferta')
        .leftJoinAndSelect('oferta.especialidadesOferta', 'especialidadesOferta')
        .leftJoinAndSelect('especialidadesOferta.especialidad', 'especialidad')
        .leftJoinAndSelect('oferta.serviciosOferta', 'serviciosOferta')
        .leftJoinAndSelect('serviciosOferta.servicio', 'servicio')
        .leftJoinAndSelect('trabajo.abogado', 'abogado')
        .leftJoinAndSelect('trabajo.cliente', 'cliente')
        .leftJoinAndSelect('trabajo.pagos', 'pagos')
        .leftJoinAndSelect('trabajo.pagosAbogado', 'pagosAbogado')
        .leftJoinAndSelect('trabajo.progresos', 'progresos')
        .where('abogado.id = :id', { id: abogadoId });

    if (estado) {
      query.andWhere('trabajo.estado = :estado', { estado });
    }

    // Ejecutamos la consulta
    const trabajos = await query.getMany();

    return trabajos;
  }

  async eliminarAbogadoPorId(id: number): Promise<{ mensaje: string }> {
    const abogado = await this.abogadosRepository.findOne({
      where: { id },
      relations: [
        'habilidadesBlandas',
        'habilidadesDuras',
        'industriasAbogado',
        'serviciosAbogado',
        'especialidadesAbogado',
        'experiencias',
        'educaciones',
        'aplicaciones',
        'trabajos',
        'invitaciones',
        'files',
        'pagos',
        'usuario',
      ],
    });

    if (!abogado) {
      throw new NotFoundException('Abogado no encontrado');
    }

    await this.abogadosRepository.remove(abogado);
    return { mensaje: 'Abogado eliminado correctamente junto con sus relaciones' };
  }
}