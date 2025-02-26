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
import { ExperienciasEntity } from '../../modules/experiencia/experiencias.entity';
import { EducacionesEntity } from '../../modules/educacion/educaciones.entity';

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
          validado_admin: true,
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
          active: 1,
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
        },
        {
          validado_admin: true,
          nombres: "Mariana",
          apellidos: "Pérez López",
          correo: "mariana.perez@example.com",
          contrasena: await bcrypt.hash("ingeniera456", +process.env.HASH_SALT),
          dni: "12345678",
          telefono: "987654321",
          direccion: "Av. Las Flores 120",
          sobre_ti: "Ingeniera de software apasionada por la innovación y el desarrollo de soluciones tecnológicas.",
          grado_academico: "Maestría",
          cip: "12345",
          active: 1,
          colegio: "Escuela de Ingeniería",
          habilidadesBlandas: ["Liderazgo", "Adaptabilidad", "Pensamiento crítico"],
          habilidadesDuras: ["Python", "Django", "Java", "AWS"],
          industrias: [2, 4, 5],
          servicios: [1, 3, 5],
          especialidades: [2, 3, 6],
          experiencias: [
            {
              fecha_inicio: "2019-06-01",
              fecha_fin: "2021-06-01",
              titulo: "Desarrolladora de Software",
              institucion: "Tech Solutions S.A.",
              descripcion: "Desarrollo de aplicaciones web utilizando Python y Django."
            },
            {
              fecha_inicio: "2021-07-01",
              fecha_fin: "2023-12-01",
              titulo: "Ingeniera de Software Senior",
              institucion: "Innovatech Labs",
              descripcion: "Liderazgo de equipos de desarrollo y arquitectura de soluciones en la nube con AWS."
            }
          ],
          educaciones: [
            {
              fecha_inicio: "2010-01-01",
              fecha_fin: "2014-01-01",
              titulo: "Licenciatura en Ingeniería de Sistemas",
              institucion: "Universidad Nacional de Ingeniería",
              ubicacion: "Lima, Perú",
              descripcion: "Formación en ingeniería de software, bases de datos y redes de computadoras."
            },
            {
              fecha_inicio: "2017-01-01",
              fecha_fin: "2019-01-01",
              titulo: "Maestría en Inteligencia Artificial",
              institucion: "Universidad Politécnica de Madrid",
              ubicacion: "Madrid, España",
              descripcion: "Enfoque en aprendizaje automático y procesamiento de lenguaje natural."
            }
          ],
        },
        {
          validado_admin: true,
          nombres: "Carlos",
          apellidos: "Martínez García",
          correo: "carlos.martinez@example.com",
          contrasena: await bcrypt.hash("abogado789", +process.env.HASH_SALT),
          dni: "98765432",
          telefono: "912345678",
          direccion: "Calle de la Justicia 305",
          sobre_ti: "Abogado especializado en derecho corporativo, con más de 5 años de experiencia en asesoría legal a empresas.",
          grado_academico: "Licenciatura",
          cip: "50012",
          active: 1,
          colegio: "Colegio de Abogados de Lima",
          habilidadesBlandas: ["Comunicación", "Resolución de conflictos", "Trabajo en equipo"],
          habilidadesDuras: ["Derecho Corporativo", "Contratos", "Litigios comerciales"],
          industrias: [4, 6, 9], // Empresas, Comercial, Finanzas
          servicios: [2, 5, 6], // Consultoría, Litigios, Contratos
          especialidades: [1, 4, 5], // Derecho Comercial, Derecho Corporativo, Derecho Laboral
          experiencias: [
            {
              fecha_inicio: "2017-03-01",
              fecha_fin: "2020-06-01",
              titulo: "Abogado Corporativo",
              institucion: "Estudio Legal ABC",
              descripcion: "Asesoría legal a empresas, redacción y revisión de contratos comerciales y litigios corporativos."
            },
            {
              fecha_inicio: "2020-07-01",
              fecha_fin: "2024-01-01",
              titulo: "Abogado Senior",
              institucion: "Consultora Jurídica XYZ",
              descripcion: "Liderazgo en el área de litigios comerciales y defensa de empresas en procesos judiciales de alto impacto."
            }
          ],
          educaciones: [
            {
              fecha_inicio: "2010-01-01",
              fecha_fin: "2014-01-01",
              titulo: "Licenciatura en Derecho",
              institucion: "Universidad de Lima",
              ubicacion: "Lima, Perú",
              descripcion: "Formación en derecho civil, penal y comercial."
            },
            {
              fecha_inicio: "2015-01-01",
              fecha_fin: "2017-01-01",
              titulo: "Maestría en Derecho Corporativo",
              institucion: "Universidad Pontificia Comillas",
              ubicacion: "Madrid, España",
              descripcion: "Especialización en derecho de las empresas, fusiones y adquisiciones."
            }
          ],
        },
        {
          validado_admin: true,
          nombres: "Laura",
          apellidos: "Gómez Fernández",
          correo: "laura.gomez@example.com",
          contrasena: await bcrypt.hash("abogado234", +process.env.HASH_SALT),
          dni: "56473821",
          telefono: "965432109",
          direccion: "Av. Libertad 801",
          sobre_ti: "Abogada penalista con más de 8 años de experiencia en litigios, defensa criminal y asesoría jurídica en casos complejos.",
          grado_academico: "Licenciatura",
          cip: "40045",
          active: 1,
          colegio: "Colegio de Abogados de Madrid",
          habilidadesBlandas: ["Empatía", "Negociación", "Pensamiento estratégico"],
          habilidadesDuras: ["Derecho Penal", "Litigios Criminales", "Defensa Penal"],
          industrias: [8, 9], // Justicia, Gobierno
          servicios: [1, 7, 9], // Defensa Penal, Litigios, Asesoría Jurídica
          especialidades: [1, 2, 7], // Derecho Penal, Derecho Constitucional, Derecho de Familia
          experiencias: [
            {
              fecha_inicio: "2015-01-01",
              fecha_fin: "2018-12-01",
              titulo: "Abogada Penalista",
              institucion: "Estudio Jurídico Pérez & Asociados",
              descripcion: "Defensa de clientes en casos penales, desde delitos menores hasta delitos graves."
            },
            {
              fecha_inicio: "2019-01-01",
              fecha_fin: "2024-01-01",
              titulo: "Abogada Penal Senior",
              institucion: "Despacho Jurídico Gómez & Asociados",
              descripcion: "Liderazgo en casos de alto perfil, litigación en tribunales y asesoría en derecho penal internacional."
            }
          ],
          educaciones: [
            {
              fecha_inicio: "2008-01-01",
              fecha_fin: "2012-01-01",
              titulo: "Licenciatura en Derecho Penal",
              institucion: "Universidad Autónoma de Madrid",
              ubicacion: "Madrid, España",
              descripcion: "Formación en derecho penal y procesal penal, con énfasis en derechos humanos."
            },
            {
              fecha_inicio: "2013-01-01",
              fecha_fin: "2015-01-01",
              titulo: "Máster en Derecho Penal Internacional",
              institucion: "Universidad de Salamanca",
              ubicacion: "Salamanca, España",
              descripcion: "Especialización en derecho penal internacional y resolución de conflictos penales transnacionales."
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
            telefono: element.telefono
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
          // savedAbogado.industriasAbogado = industriasAbogado;
          // savedAbogado.serviciosAbogado = serviciosAbogado;
          // savedAbogado.especialidadesAbogado = especialidadesAbogado;
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