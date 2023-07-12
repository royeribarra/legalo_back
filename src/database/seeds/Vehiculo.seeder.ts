import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { VehiculoDTO } from 'src/modules/mantenimiento/vehiculos/dto/vehiculo.dto';
import { VehiculosEntity } from 'src/modules/mantenimiento/vehiculos/entities/vehiculo.entity';

export default class VehiculoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const userrepository =  dataSource.getRepository(VehiculosEntity);
      const data : VehiculoDTO[] = [
        {
          codigo: 'CT001',
          capacidadCarga: 30000,
          disponiblidad: 'disponible',
          estadoMantenimiento: 'Mantenimiento programado para la próxima semana',
          licencia: '',
          placa: 'ABC123',
          responsable: 'Juan Pérez',
          vencimientoMTC: '990393939',
          vencimientoPoliza: null,
          vencimientoRD: null,
          vencimientoSOAT: null,
          tipoVehiculo: null
        },
        {
          codigo: 'FR001',
          capacidadCarga: 1000,
          disponiblidad: 'No disponible (en ruta de reparto)',
          estadoMantenimiento: 'En buen estado',
          licencia: '',
          placa: 'DEF456',
          responsable: 'Juan Pérez',
          vencimientoMTC: '990393939',
          vencimientoPoliza: null,
          vencimientoRD: null,
          vencimientoSOAT: null,
          tipoVehiculo: null
        },
        {
          codigo: 'RR002',
          capacidadCarga: 20,
          disponiblidad: 'disponible',
          estadoMantenimiento: 'En perfecto estado',
          licencia: '',
          placa: 'GHI789',
          responsable: 'Pedro Rodríguez',
          vencimientoMTC: '990393939',
          vencimientoPoliza: null,
          vencimientoRD: null,
          vencimientoSOAT: null,
          tipoVehiculo: null
        },
        {
          codigo: 'CV003',
          capacidadCarga: 10,
          disponiblidad: 'disponible',
          estadoMantenimiento: 'Requiere cambio de aceite y filtro',
          licencia: '',
          placa: 'JKL012',
          responsable: 'Juan Pérez',
          vencimientoMTC: '990393939',
          vencimientoPoliza: null,
          vencimientoRD: null,
          vencimientoSOAT: null,
          tipoVehiculo: null
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const vehiculoExists = await userrepository.findOneBy({ placa: element.placa });
        if (!vehiculoExists) {
          dataToInsert.push(element);
        }
      }
      
      await userrepository.insert(dataToInsert);
      console.log("Vehículos insertados correctamente");
    } catch (error) {
      console.error('Error en el VehiculoSeeder:', error);
    }
  }
}