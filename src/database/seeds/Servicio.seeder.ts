import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ServiciosEntity } from '../../modules/servicio/servicios.entity';

export default class ServicioSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const servicioRepository =  dataSource.getRepository(ServiciosEntity);
      const data= [
        {
            nombre: "No estoy seguro del servicio a escoger"
        },
        {
            nombre: "Asesoría legal"
        },
        {
            nombre: "Consultoría "
        },
        {
            nombre: "Patrocinio en poder judicial"
        },
        {
            nombre: "Patrocinio en procedimiento administrativo"
        },
        {
            nombre: "Redacción de Documentos Legales"
        },
        {
            nombre: "Cumplimiento Regulatorio"
        },
        {
            nombre: "Mediación"
        },
        {
            nombre: "Prácticas pre-profesionales"
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const clienteExists = await servicioRepository.findOneBy({ nombre: element.nombre });
        if (!clienteExists) {
          dataToInsert.push(element);
        }
      }
      
      await servicioRepository.insert(dataToInsert);
      console.log("Servicios insertados correctamente");
    } catch (error) {
      console.error('Error en el ServicioSeeder:', error);
    }
  }
}