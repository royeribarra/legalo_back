import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { RolesEntity } from '../../modules/mantenimiento/roles/entities/roles.entity';

export default class RolSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const rolRepository =  dataSource.getRepository(RolesEntity);
      const data = [
        {
          nombre: 'Administrador',
          descripcion: 'Rol que puede ver todo'
        },
        {
          nombre: 'Comercial',
          descripcion: 'área de comercial'
        },
        {
          nombre: 'Transporte',
          descripcion: 'área de transporte'
        },
        {
          nombre: 'Calidad',
          descripcion: 'área de calidad'
        },
        {
          nombre: 'Control Interno',
          descripcion: 'área de control interno'
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const rolExists = await rolRepository.findOneBy({ nombre: element.nombre });
        if (!rolExists) {
          dataToInsert.push(element);
        }
      }
      
      await rolRepository.insert(dataToInsert);
      console.log("Roles insertados correctamente");
    } catch (error) {
      console.error('Error en el rolSeeder:', error);
    }
    
  }

 
}