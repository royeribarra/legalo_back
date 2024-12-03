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
            nombre: "Abogado Civil"
        },
        {
            nombre: "Abogado Penalista"
        },
        {
            nombre: "Abogado Laboral"
        },
        {
            nombre: "Abogado Familiar"
        },
        {
            nombre: "Abogado Empresarial"
        },
        {
            nombre: "Abogado Ambiental"
        },
        {
            nombre: "Abogado de Competencia"
        },
        {
            nombre: "Abogado de Competencia Desleal"
        },
        {
            nombre: "Abogado de Propiedad Intelectual"
        },
        {
            nombre: "Abogado de Protección al consumidor"
        },
        {
            nombre: "Abogado de Tecnología y Datos"
        },
        {
            nombre: "Abogado de Salud"
        },
        {
            nombre: "Abogado de derecho Tributario"
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