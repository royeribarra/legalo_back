import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { SucursalesClienteEntity } from '../../modules/solicitudes/sucursalesCliente/entities/sucursalesCliente.entity';
import { SucursalClienteDTO } from '../../modules/solicitudes/sucursalesCliente/dto/sucursalCliente.dto';
import { ClientesEntity } from '../../modules/solicitudes/clientes/entities/clientes.entity';

export default class SucursalClienteSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const clientesRepository =  dataSource.getRepository(ClientesEntity);
      const sucursalRepository =  dataSource.getRepository(SucursalesClienteEntity);

      const clientes = await clientesRepository.find();

      const data = [
        {
          nombre: 'Administrador',
          direccion: 'Calle Las Flores 123',
          distrito: 'Surco',
          provincia: 'Lima',
          contacto: 'Santiago Herrera Pérez',
          numeroContacto: '',
          codigoSucursal: 'INCHCA-01',
          latitud: '-12.17077411118961',
          longitud: '-76.98868150420377',
          cliente: clientes[0],
          observaciones: ""
        },
        {
          nombre: 'Administrador',
          direccion: 'Av. Los Pinos 456',
          distrito: 'Lurigancho',
          provincia: 'Lima',
          contacto: 'Lucas Hernández Mendoza',
          numeroContacto: '',
          codigoSucursal: 'INCHCA-02',
          latitud: '-11.997581265557953',
          longitud: '-77.0520783330428',
          cliente: clientes[0],
          observaciones: ""
        },
        {
          nombre: 'Administrador',
          direccion: 'Calle Larco 789',
          distrito: 'Miraflores',
          provincia: 'Lima',
          contacto: 'Isabella Rodríguez Gómez',
          numeroContacto: '',
          codigoSucursal: 'MITSUI-01',
          latitud: '-12.125749530255671',
          longitud: '-77.0293857042047',
          cliente: clientes[1],
          observaciones: ""
        },
        {
          nombre: 'Administrador',
          direccion: 'Jr. Los Olivos 321',
          distrito: 'San Agustino',
          provincia: 'Lima',
          contacto: 'Valentina García Vargas',
          numeroContacto: '',
          codigoSucursal: 'MITSUI-02',
          latitud: '-11.982800611355085',
          longitud: '-77.09495580142543',
          cliente: clientes[1],
          observaciones: ""
        },
        {
          nombre: 'Administrador',
          direccion: 'Av. La Marina 654',
          distrito: 'Callao',
          provincia: 'Callao',
          contacto: 'Mateo López García',
          numeroContacto: '',
          codigoSucursal: 'DERCOC-01',
          latitud: '-12.068606529633888',
          longitud: '-77.11439527537013',
          cliente: clientes[2],
          observaciones: ""
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const sucursalExists = await sucursalRepository.findOneBy({ nombre: element.nombre });
        if (!sucursalExists) {
          dataToInsert.push(element);
        }
      }
      
      await sucursalRepository.insert(dataToInsert);
      console.log("Roles insertados correctamente");
    } catch (error) {
      console.error('Error en el rolSeeder:', error);
    }
    
  }

 
}