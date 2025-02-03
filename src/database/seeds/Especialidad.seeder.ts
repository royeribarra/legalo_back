import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { EspecialidadesEntity } from '../../modules/especialidad/especialidades.entity';

export default class EspecialidadSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const especialidadRepository =  dataSource.getRepository(EspecialidadesEntity);
      const data= [
        {
          nombre: "Abogado Civil",
          descripcion: "¿Necesitas revisar o firmar un contrato, asegurar la compra o alquiler de una propiedad o con el trámite de una herencia familiar?",
          imagen: "/civil.svg"
        },
        {
          nombre: "Abogado Penalista",
          descripcion: "¿Te enfrentas a un juicio penal, necesitas asesoría en una investigación policial o quieres conocer tus derechos ante una detención?",
          imagen: "/penalista.svg"
        },
        {
          nombre: "Abogado Laboral",
          descripcion: "¿Tienes problemas con un contrato de trabajo, fuiste despedido injustamente, necesitas asesoría en una inspección de SUNAFIL o sobre derechos laborales, como maternidad o acoso?",
          imagen: "/laboral.svg"
        },
        {
          nombre: "Abogado Procesalista",
          descripcion: "¿Quieres presentar una demanda, necesitas ayuda para defenderte en un proceso judicial, o necesitas orientación en el seguimiento de tu caso judicial?",
          imagen: "/procesalista.svg"
        },
        {
          nombre: "Abogado Administrativo",
          descripcion: "¿Necesitas apoyo para gestionar trámites con entidades públicas, defenderte de una sanción o multa o resolver problemas con permisos y licencias?",
          imagen: "/administrativo.svg"
        },
        {
          nombre: "Abogado de Familia",
          descripcion: "¿Estás atravesando un divorcio, buscas custodia compartida, o necesitas asesoría sobre pensiones alimenticias y acuerdos familiares?",
          imagen: "/familia.svg"
        },
        {
          nombre: "Abogado Tributario",
          descripcion: "¿Necesitas ayuda con la declaración de impuestos, o defensa en fiscalización de SUNAT o en un litigio tributario?",
          imagen: "/tributario.svg"
        },
        {
          nombre: "Abogado de Migraciones",
          descripcion: "¿Necesitas ayuda con trámites de residencia, permisos de trabajo, o enfrentas problemas de inmigración?",
          imagen: "/migraciones.svg"
        },
        {
          nombre: "Abogado de Protección al Consumidor",
          descripcion: "¿Te vendieron un producto defectuoso, no cumplieron con la garantía o te han hecho cobros indebidos?",
          imagen: "/proteccion-al-consumidor.svg"
        },
        {
          nombre: "Abogado Empresarial",
          descripcion: "¿Planeas constituir una empresa, necesitas revisar contratos comerciales o estás involucrado en una fusión o disputa entre socios?",
          imagen: "/empresarial.svg"
        },
        {
          nombre: "Abogado Ambiental",
          descripcion: "¿Necesitas asesoría sobre normativa ambiental, enfrentas problemas de permisos, o necesitas defensa en casos de contaminación?",
          imagen: "/ambiental.svg"
        },
        {
          nombre: "Abogado de Arbitraje y Resolución de Conflicto",
          descripcion: "¿Tu contrato requiere resolver un conflicto ante un árbitro o tribunal arbitral o estás considerando iniciar una mediación o demanda arbitral?",
          imagen: "/arbitraje-resolucion-conflictos.svg"
        },
        {
          nombre: "Abogado de la Competencia",
          descripcion: "¿Te han denunciado por prácticas anticompetitivas, o buscas cumplir con las normativas de competencia y evitar sanciones?",
          imagen: "/competencia.svg"
        },
        {
          nombre: "Abogado de Competencia Desleal",
          descripcion: "¿Necesitas proteger tu marca de publicidad engañosa o tu negocio enfrenta prácticas desleales?",
          imagen: "/competencia-desleal.svg"
        },
        {
          nombre: "Abogado de Compliance",
          descripcion: "¿Necesitas asesoría para cumplir con normativas legales, prevenir riesgos empresariales o implementar políticas de ética en tu organización?",
          imagen: "/compliance.svg"
        },
        {
          nombre: "Abogado de Propiedad Intelectual",
          descripcion: "¿Quieres registrar una marca, proteger una invención o necesitas ayuda para defenderte de infracciones a tus derechos de autor?",
          imagen: "/propiedad-intelectual.svg"
        },
        {
          nombre: "Abogado de Tecnología y Datos",
          descripcion: "¿Necesitas asesoría para proteger datos personales, negociar contratos de software, o resolver problemas de ciberseguridad?",
          imagen: "/tecnologia-de-datos.svg"
        },
        {
          nombre: "Abogado de Salud",
          descripcion: "¿Enfrentas un conflicto de mala praxis médica, necesitas asesoría en seguros de salud, o buscas defender tus derechos como paciente?",
          imagen: "/salud.svg"
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const clienteExists = await especialidadRepository.findOneBy({ nombre: element.nombre });
        if (!clienteExists) {
          dataToInsert.push(element);
        }
      }

      await especialidadRepository.insert(dataToInsert);
      console.log("Especialidades insertados correctamente");
    } catch (error) {
      console.error('Error en el EspecialidadSeeder:', error);
    }
  }
}