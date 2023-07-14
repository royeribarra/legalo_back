import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TipoVehiculoEntity } from '../../modules/mantenimiento/vehiculos/entities/tipoVehiculo.entity';
import { TipoVehiculoDTO } from '../../modules/mantenimiento/vehiculos/dto/tipoVehiculo.dto';

export default class TipoVehiculoSeeder implements Seeder {
  
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const tipoVehiculoRepository =  dataSource.getRepository(TipoVehiculoEntity);
      const data : TipoVehiculoDTO[]= [
        {
          nombre: 'Camión cisterna',
          descripcion: 'Un vehículo de gran tamaño diseñado para transportar líquidos o gases a granel. Se utiliza comúnmente para transportar combustibles, productos químicos y otros líquidos peligrosos.'
        },
        {
          nombre: 'Furgoneta de reparto',
          descripcion: 'Un vehículo de carga pequeño o mediano utilizado para entregar mercancías. Puede ser utilizado para transportar productos sensibles o frágiles que requieren un manejo especial.'
        },
        {
          nombre: 'Remolque refrigerado',
          descripcion: 'Un remolque acoplado a un vehículo tractor que está equipado con un sistema de refrigeración. Se utiliza para transportar alimentos perecederos y otros productos que requieren mantenerse a temperaturas bajas.'
        },
        {
          nombre: 'Camión de volteo',
          descripcion: 'Un vehículo pesado utilizado para transportar materiales a granel, como tierra, arena o escombros. Tiene una caja basculante que permite descargar la carga de manera rápida y eficiente.'
        },
        {
          nombre: 'Camión de transporte de químicos',
          descripcion: 'Un vehículo diseñado específicamente para transportar productos químicos peligrosos de manera segura. Está equipado con sistemas de contención y ventilación adecuados para evitar fugas o derrames durante el transporte.'
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const tipoExists = await tipoVehiculoRepository.findOneBy({ nombre: element.nombre });
        if (!tipoExists) {
          dataToInsert.push(element);
        }
      }
      
      await tipoVehiculoRepository.insert(dataToInsert);
      console.log("Tipos de vehiculos insertados correctamente");
    } catch (error) {
      console.error('Error en el TipoVehiculoSeeder:', error);
    }
    
  }

 
}