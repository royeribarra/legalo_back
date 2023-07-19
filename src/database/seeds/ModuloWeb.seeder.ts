import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { RolesEntity } from '../../modules/mantenimiento/roles/entities/roles.entity';
import { ModulosWebEntity } from 'src/modules/mantenimiento/roles/entities/modulosWeb.entity';
import { ModuloWebDTO } from 'src/modules/mantenimiento/roles/dto/moduloWeb.dto';

export default class ModuloWebSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const moduloRepository =  dataSource.getRepository(ModulosWebEntity);
      const data : ModuloWebDTO[]= [
        {
          nombre: 'usuarios',
          descripcion: 'modulo para ver usuarios'
        },
        {
          nombre: 'conductores',
          descripcion: 'modulo para ver conductores'
        },
        {
          nombre: 'vehiculos',
          descripcion: 'modulo para ver vehiculos'
        },
        {
          nombre: 'solicitudes',
          descripcion: 'modulo para ver solicitudes'
        },
        {
          nombre: 'roles',
          descripcion: 'modulo para ver roles'
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const rolExists = await moduloRepository.findOneBy({ nombre: element.nombre });
        if (!rolExists) {
          dataToInsert.push(element);
        }
      }
      
      await moduloRepository.insert(dataToInsert);
      console.log("Roles insertados correctamente");
    } catch (error) {
      console.error('Error en el ModuloWebSeeder:', error);
    }
    
  }
}