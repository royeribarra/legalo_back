import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ClientesEntity } from '../../modules/cliente/entities/clientes.entity';
import { ClienteSeederDTO } from '../../modules/cliente/dto/cliente.dto';
import * as bcrypt from 'bcrypt';
import { OfertasEntity } from '../../modules/oferta/oferta.entity';
import { PreguntasOfertaEntity } from '../../modules/preguntas_oferta/preguntasOferta.entity';
import { IndustriasAbogadoEntity } from '../../modules/industria/industriaAbogado.entity';
import { ServiciosAbogadoEntity } from '../../modules/servicio/servicioAbogado.entity';
import { EspecialidadesAbogadoEntity } from '../../modules/especialidad/especialidadAbogado.entity';
import { In } from 'typeorm';
import { IndustriasOfertaEntity } from '../../modules/industria/industriaOferta.entity';
import { ServiciosOfertaEntity } from '../../modules/servicio/servicioOferta.entity';
import { EspecialidadesOfertaEntity } from '../../modules/especialidad/especialidadOferta.entity';

export default class OfertaSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const ofertaRepository =  dataSource.getRepository(OfertasEntity);
      const clienteRepository =  dataSource.getRepository(ClientesEntity);
      const preguntaOfertaRepository =  dataSource.getRepository(PreguntasOfertaEntity);
      const industriasOfertaRepository = dataSource.getRepository(IndustriasOfertaEntity);
      const serviciosOfertaRepository = dataSource.getRepository(ServiciosOfertaEntity);
      const especialidadesOfertaRepository = dataSource.getRepository(EspecialidadesOfertaEntity);
      const data= [
        {
            uso: "Personal",
            titulo: "Oferta 1",
            descripcion: "este es una oferta de prueba 1",
            documento_url: "",
            duracion: "2 semanas",
            experiencia_abogado: "4 meses",
            salario_minimo: "500",
            salario_maximo: "1000",
            estado: "creada",
            industrias: [1, 2, 3, 4],
            servicios: [1, 2, 3, 4],
            especialidades: [1, 2, 3, 4],
            preguntasOferta: [
              {
                pregunta: "¿Donde vives oferta 1?"
              },
              {
                pregunta: "¿Donde estudias oferta 1?"
              },
              {
                pregunta: "¿Donde trabajas oferta 1?"
              }
            ]
        },
        {
          uso: "Empresarial",
          titulo: "Oferta 2",
          descripcion: "este es una oferta de prueba 2",
          documento_url: "",
          duracion: "2 semanas",
          experiencia_abogado: "4 meses",
          salario_minimo: "500",
          salario_maximo: "1000",
          estado: "creada",
          industrias: [4, 5, 6],
          servicios: [4, 5, 6],
          especialidades: [4, 5, 6],
          preguntasOferta: [
            {
              pregunta: "¿Donde vives oferta 2?"
            },
            {
              pregunta: "¿Donde estudias oferta 2?"
            },
            {
              pregunta: "¿Donde trabajas oferta 2?"
            }
          ]
        },
        {
          uso: "Tecnológica",
          titulo: "Oferta 3",
          descripcion: "Esta es una oferta de prueba 3, dirigida a perfiles tecnológicos con experiencia en desarrollo de software.",
          documento_url: "https://www.example.com/oferta-3.pdf",
          duracion: "1 mes",
          experiencia_abogado: "Ninguna",
          salario_minimo: "1200",
          salario_maximo: "2500",
          estado: "abierta",
          industrias: [1, 2, 3],
          servicios: [1, 2, 3],
          especialidades: [2, 4, 6],
          preguntasOferta: [
            {
              pregunta: "¿Cuál es tu experiencia en desarrollo de software?"
            },
            {
              pregunta: "¿Tienes conocimientos en metodologías ágiles?"
            },
            {
              pregunta: "¿Qué lenguajes de programación dominas?"
            }
          ]
        },
        {
          uso: "Salud",
          titulo: "Oferta 4",
          descripcion: "Oferta de trabajo en el sector salud para profesionales médicos, con énfasis en atención al paciente.",
          documento_url: "https://www.example.com/oferta-4.pdf",
          duracion: "6 meses",
          experiencia_abogado: "Ninguna",
          salario_minimo: "1500",
          salario_maximo: "4000",
          estado: "en progreso",
          industrias: [7, 8],
          servicios: [7, 8],
          especialidades: [1, 5],
          preguntasOferta: [
            {
              pregunta: "¿Tienes experiencia en atención primaria?"
            },
            {
              pregunta: "¿Has trabajado en hospitales públicos o privados?"
            },
            {
              pregunta: "¿Qué tratamientos o especialidades dominas?"
            }
          ]
        }
      ];

      const dataToInsert = [];

      for (const element of data) {
        const clienteExists = await ofertaRepository.findOneBy({ titulo: element.titulo });
        if (!clienteExists) {
          const cliente = await clienteRepository.findOneBy({id: 1});

          const oferta = ofertaRepository.create({
            uso: element.uso,
            titulo: element.titulo,
            descripcion: element.descripcion,
            documento_url: element.documento_url,
            duracion: element.duracion,
            experiencia_abogado: element.experiencia_abogado,
            salario_maximo: element.salario_maximo,
            salario_minimo: element.salario_minimo,
            estado: element.estado,
            cliente: cliente
          });

          const savedOferta = await ofertaRepository.save(oferta);

          const preguntasOferta = await preguntaOfertaRepository.save(
            element.preguntasOferta.map((pregunta) => ({
              pregunta: pregunta.pregunta,
              oferta: savedOferta
            }))
          );

          const servicios = await serviciosOfertaRepository.findBy({ id: In(element.servicios) });
          const serviciosOferta = await serviciosOfertaRepository.save(
            servicios.map((servicio) => ({
              oferta: savedOferta,
              servicio: servicio
            }))
          );

          const especialidades = await especialidadesOfertaRepository.findBy({ id: In(element.especialidades) });
          const especialidadesOferta = await especialidadesOfertaRepository.save(
            especialidades.map((especialidad) => ({
              oferta: savedOferta,
              especialidad: especialidad
            }))
          );

          const industrias = await industriasOfertaRepository.findBy({ id: In(element.industrias) });
          const industriasOferta = await industriasOfertaRepository.save(
            industrias.map((industria) => ({
              oferta: savedOferta,
              industria: industria
            }))
          );

          savedOferta.preguntas_oferta = preguntasOferta;
          savedOferta.serviciosOferta = serviciosOferta;
          savedOferta.especialidadesOferta = especialidadesOferta;
          savedOferta.industriasOferta = industriasOferta;

          dataToInsert.push(element);
        }
      }

      await ofertaRepository.insert(dataToInsert);
      console.log("Ofertas insertados correctamente");
    } catch (error) {
      console.error('Error en el OfertaSeeder:', error);
    }
  }
}