import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { AbogadoDTO } from '../../modules/abogado/dto/abogado.dto';
import { AbogadosEntity } from '../../modules/abogado/entities/abogados.entity';
import * as bcrypt from 'bcrypt';
import { HabilidadesBlandaEntity } from '../../modules/habilidadBlanda/habilidadesBlanda.entity';
import { HabilidadesDuraEntity } from '../../modules/habilidadDura/habilidadesDura.entity';
import { IndustriasAbogadoEntity } from '../../modules/industria/industriaAbogado.entity';
import { ServiciosAbogadoEntity } from '../../modules/servicio/servicioAbogado.entity';
import { EspecialidadesAbogadoEntity } from '../../modules/especialidad/especialidadAbogado.entity';
import e from 'express';
import { In } from 'typeorm';
import { ExperienciasEntity } from 'src/modules/experiencia/experiencias.entity';
import { EducacionesEntity } from 'src/modules/educacion/educaciones.entity';

export default class AbogadoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const abogadoRepository =  dataSource.getRepository(AbogadosEntity);
      const habilidadesBlandaRepository = dataSource.getRepository(HabilidadesBlandaEntity);
      const habilidadesDuraRepository = dataSource.getRepository(HabilidadesDuraEntity);
      const industriasAbogadoRepository = dataSource.getRepository(IndustriasAbogadoEntity);
      const serviciosAbogadoRepository = dataSource.getRepository(ServiciosAbogadoEntity);
      const especialidadesAbogadoRepository = dataSource.getRepository(EspecialidadesAbogadoEntity);
      const experienciasRepository = dataSource.getRepository(ExperienciasEntity);
      const educacionesRepository = dataSource.getRepository(EducacionesEntity);
      const data = [
        {
          nombres: "Royer",
          apellidos: "Ibarra",
          correo: "royer@gmail.com",
          contrasena: await bcrypt.hash("abogado123", +process.env.HASH_SALT),
          dni: "70019408",
          telefono: "939784580",
          direccion: "Jr. chacabuco N° 306",
          sobre_ti: "ing. sistemas",
          grado_academico: "Universitario",
          cip: "70027",
          colegio: "ingenieros",
          video: "",
          foto: "",
          cv: "",
          cul: "",
          habilidadesBlandas: ["Comunicación", "Trabajo en equipo"],
          habilidadesDuras: ["JavaScript", "TypeScript"],
          industrias: [1, 2, 3, 4],
          servicios: [1, 2, 3, 4],
          especialidades: [1, 2, 3, 4],
          experiencias: [
            {
              fecha_inicio: "2020-01-01",
              fecha_fin: "2022-01-01",
              titulo: "Abogado Junior",
              institucion: "Firma Legal XYZ",
              descripcion: "Asesoría en derecho corporativo."
            },
            {
              fecha_inicio: "2022-02-01",
              fecha_fin: "2024-01-01",
              titulo: "Abogado Senior",
              institucion: "Firma Legal ABC",
              descripcion: "Litigio y defensa en casos comerciales."
            }
          ],
          educaciones: [
            {
              fecha_inicio: "2015-01-01",
              fecha_fin: "2019-01-01",
              titulo: "Licenciatura en Derecho",
              institucion: "Universidad ABC",
              ubicacion: "Lima, Perú",
              descripcion: "Estudios de derecho con enfoque en derecho empresarial."
            },
            {
              fecha_inicio: "2020-01-01",
              fecha_fin: "2022-01-01",
              titulo: "Maestría en Derecho Corporativo",
              institucion: "Universidad XYZ",
              ubicacion: "Lima, Perú",
              descripcion: "Enfoque en la resolución de conflictos comerciales."
            }
          ],
        }
      ];

      const dataToInsert = [];

      for (const element of data) {
        const clienteExists = await abogadoRepository.findOneBy({ correo: element.correo, dni: element.dni });
        if (!clienteExists) {
          const abogado = abogadoRepository.create({
            nombres: element.nombres,
            apellidos: element.apellidos,
            correo: element.correo,
            dni: element.dni,
            direccion: element.direccion,
            sobre_ti: element.sobre_ti,
            grado_academico: element.grado_academico,
            cip: element.cip,
            colegio: element.colegio,
            video_url: element.video,
            foto_url: element.foto,
            cv_url: element.cv,
            cul_url: element.cul
          });
          const savedAbogado = await abogadoRepository.save(abogado);

          const habilidadesBlandas = await habilidadesBlandaRepository.save(
            element.habilidadesBlandas.map((habilidad) => ({
              nombre: habilidad,
              abogado: savedAbogado
            }))
          );

          const habilidadesDuras = await habilidadesDuraRepository.save(
            element.habilidadesDuras.map((habilidad) => ({
              nombre: habilidad,
              abogado: savedAbogado
            }))
          );

          const servicios = await serviciosAbogadoRepository.findBy({ id: In(element.servicios) });
          const serviciosAbogado = await serviciosAbogadoRepository.save(
            servicios.map((servicio) => ({
              abogado: savedAbogado,
              servicio: servicio
            }))
          );

          const especialidades = await especialidadesAbogadoRepository.findBy({ id: In(element.especialidades) });
          const especialidadesAbogado = await especialidadesAbogadoRepository.save(
            especialidades.map((especialidad) => ({
              abogado: savedAbogado,
              especialidad: especialidad
            }))
          );

          const industrias = await industriasAbogadoRepository.findBy({ id: In(element.industrias) });
          const industriasAbogado = await industriasAbogadoRepository.save(
            industrias.map((industria) => ({
              abogado: savedAbogado,
              industria: industria
            }))
          );

          const experiencias = await experienciasRepository.save(
            element.experiencias.map((experiencia) => ({
              ...experiencia,
              abogado: savedAbogado
            }))
          );

          const educaciones = await educacionesRepository.save(
            element.educaciones.map((educacion) => ({
              ...educacion,
              abogado: savedAbogado
            }))
          );

          savedAbogado.habilidadesBlandas = habilidadesBlandas;
          savedAbogado.habilidadesDuras = habilidadesDuras;
          savedAbogado.industriasAbogado = industriasAbogado;
          savedAbogado.serviciosAbogado = serviciosAbogado;
          savedAbogado.especialidadesAbogado = especialidadesAbogado;
          savedAbogado.experiencias = experiencias;
          savedAbogado.educaciones = educaciones;
          dataToInsert.push(savedAbogado);
        }
      }

      await abogadoRepository.save(dataToInsert);
      console.log("Abogados insertados correctamente");
    } catch (error) {
      console.error('Error en el AbogadoSeeder:', error);
    }
  }
}