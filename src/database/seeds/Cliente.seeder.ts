import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ClientesEntity } from '../../modules/solicitudes/clientes/entities/clientes.entity';
import { ClienteDTO } from 'src/modules/solicitudes/clientes/dto/cliente.dto';

export default class ClienteSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const clienteRepository =  dataSource.getRepository(ClientesEntity);
      const data : ClienteDTO []= [
        {
          ruc: '20504667809',
          nombre: 'INCHCAPE LATAM PERU SA',
          contactoPrincipal: 'Santiago Herrera Pérez',
          direccion: '',
          numeroContacto: '934 567 890',
          codigo: 'INCHCA'
        },
        
        {
          ruc: '20457634160',
          nombre: 'MITSUI AUTOMOTRIZ SA',
          contactoPrincipal: 'Isabella Rodríguez Gómez',
          direccion: '',
          numeroContacto: '977 123 456',
          codigo: 'MITSUI'
        },
        {
          ruc: '20734562341 ',
          nombre: 'DERCOCENTER SAC',
          contactoPrincipal: 'Mateo López García',
          direccion: '',
          numeroContacto: '956 789 012',
          codigo: 'DERCOC'
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const clienteExists = await clienteRepository.findOneBy({ nombre: element.nombre, codigo: element.codigo });
        if (!clienteExists) {
          dataToInsert.push(element);
        }
      }
      
      await clienteRepository.insert(dataToInsert);
      console.log("Clientes insertados correctamente");
    } catch (error) {
      console.error('Error en el ClienteSeeder:', error);
    }
  }
}