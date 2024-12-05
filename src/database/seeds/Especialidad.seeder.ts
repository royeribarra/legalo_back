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
            imagen: "icos/ico-d-civil.png"
        },
        {
            nombre: "Abogado Penalista",
            imagen: "icos/ico-d-penal.png"
        },
        {
            nombre: "Abogado Laboral",
            imagen: "/icos/ico-d-laboral.png"
        },
        {
            nombre: "Abogado Familiar",
            imagen: "icos/ico-d-familia.png"
        },
        {
            nombre: "Abogado Empresarial",
            imagen: "icos/ico-d-empresarial.png"
        },
        {
            nombre: "Abogado Ambiental",
            imagen: "icos/ico-d-ambiental.png"
        },
        {
            nombre: "Abogado de Competencia",
            imagen: "icos/ico-d-competencia.png"
        },
        {
            nombre: "Abogado de Competencia Desleal",
            imagen: "icos/ico-d-compe-desleal.png"
        },
        {
            nombre: "Abogado de Propiedad Intelectual",
            imagen: "icos/ico-d-intelectual.png"
        },
        {
            nombre: "Abogado de Protección al consumidor",
            imagen: "icos/ico-d-consumidor.png"
        },
        {
            nombre: "Abogado de Tecnología y Datos",
            imagen: "icos/ico-d-tecnologia.png"
        },
        {
            nombre: "Abogado de Salud",
            imagen: "icos/ico-d-salud.png"
        },
        {
            nombre: "Abogado de derecho Tributario",
            imagen: "icos/ico-d-tributario.png"
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