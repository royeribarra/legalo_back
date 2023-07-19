import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { AreaEmpresaEntity } from '../../modules/mantenimiento/areasEmpresa/entities/areasEmpresa.entity';
import { AreaEmpresaDTO } from '../../modules/mantenimiento/areasEmpresa/dto/areaEmpresa.dto';

export default class AreaEmpresaSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const areaRepository =  dataSource.getRepository(AreaEmpresaEntity);
      const data : AreaEmpresaDTO []= [
        {
          nombre: 'COMERCIAL',
          descripcion: 'área encargada de negociar con los clientes.',
          responsable: 'Carla'
        },
        {
          nombre: 'TRANSPORTE',
          descripcion: 'area encargada de manejar el tranposrte ',
          responsable: 'Kenny'
        },
        {
          nombre: 'CALIDAD',
          descripcion: 'Area encarga de evaluar el producto',
          responsable: 'Arturo'
        },
        {
          nombre: 'CONTROL INTERNO',
          descripcion: 'área encargada de llevar a cabo el control de existencia y procedimientos.',
          responsable: 'Leandra'
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const clienteExists = await areaRepository.findOneBy({ nombre: element.nombre });
        if (!clienteExists) {
          dataToInsert.push(element);
        }
      }
      
      await areaRepository.insert(dataToInsert);
      console.log("Areas de la empresa insertados correctamente");
    } catch (error) {
      console.error('Error en el AreaEmpresaSeeder:', error);
    }
  }
}