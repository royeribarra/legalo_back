import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { VehiculosEntity } from '../../modules/mantenimiento/vehiculos/entities/vehiculo.entity';
import { TipoVehiculoEntity } from '../../modules/mantenimiento/vehiculos/entities/tipoVehiculo.entity';

export default class VehiculoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const vehiculorepository =  dataSource.getRepository(VehiculosEntity);
      const tipoRepository =  dataSource.getRepository(TipoVehiculoEntity);
      const tiposVehiculo = await tipoRepository.find();
      const data = [
        {
          codigo: 'ABC123',
          nombre: 'Workercito-1',
          capacidadCarga: 30000,
          unidadMedida: 1,
          disponibilidad: 'disponible',
          estadoMantenimiento: 'Mantenimiento programado para la próxima semana',
          // licencia: '',
          placa: 'ABC123',
          responsable: 'Juan Pérez',
          // vencimientoMTC: '990393939',
          // vencimientoPoliza: null,
          // vencimientoRD: null,
          // vencimientoSOAT: null,
          tipoVehiculo: tiposVehiculo[0]
        },
        {
          codigo: 'DEF456',
          nombre: 'Workercito-2',
          // codigo: 'FR001',
          capacidadCarga: 1000,
          unidadMedida: 1,
          disponibilidad: 'No disponible (en ruta de reparto)',
          estadoMantenimiento: 'En buen estado',
          // licencia: '',
          placa: 'DEF456',
          responsable: 'Juan Pérez',
          // vencimientoMTC: '990393939',
          // vencimientoPoliza: null,
          // vencimientoRD: null,
          // vencimientoSOAT: null,
          tipoVehiculo: tiposVehiculo[1]
        },
        {
          codigo: 'GHI789',
          nombre: 'Workercito-3',
          // codigo: 'RR002',
          capacidadCarga: 20,
          unidadMedida: 1,
          disponibilidad: 'disponible',
          estadoMantenimiento: 'En perfecto estado',
          // licencia: '',
          placa: 'GHI789',
          responsable: 'Pedro Rodríguez',
          // vencimientoMTC: '990393939',
          // vencimientoPoliza: null,
          // vencimientoRD: null,
          // vencimientoSOAT: null,
          tipoVehiculo: tiposVehiculo[2]
        },
        {
          codigo: 'JKL012',
          nombre: 'Workercito-4',
          // codigo: 'CV003',
          capacidadCarga: 10,
          unidadMedida: 1,
          disponibilidad: 'disponible',
          estadoMantenimiento: 'Requiere cambio de aceite y filtro',
          // licencia: '',
          placa: 'JKL012',
          responsable: 'Juan Pérez',
          // vencimientoMTC: '990393939',
          // vencimientoPoliza: null,
          // vencimientoRD: null,
          // vencimientoSOAT: null,
          tipoVehiculo: tiposVehiculo[3]
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const vehiculoExists = await vehiculorepository.findOneBy({ placa: element.placa });
        if (!vehiculoExists) {
          dataToInsert.push(element);
        }
      }
      
      await vehiculorepository.insert(dataToInsert);
      console.log("Vehículos insertados correctamente");
    } catch (error) {
      console.error('Error en el VehiculoSeeder:', error);
    }
  }
}