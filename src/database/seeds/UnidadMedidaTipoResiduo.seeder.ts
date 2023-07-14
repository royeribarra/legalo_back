import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UnidadMedidaTipoResiduoDTO } from '../../modules/mantenimiento/tiposResiduo/dto/unidadMedidaTipoResiduo.dto';
import { UnidadesMedidaResiduoEntity } from '../../modules/mantenimiento/tiposResiduo/entities/unidadesMedidaResiduo.entity';

export default class UnidadMedidaTipoResiduoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const unidadRepository =  dataSource.getRepository(UnidadesMedidaResiduoEntity);
      const data : UnidadMedidaTipoResiduoDTO[] = [
        {
          unidadMedida: 'Litros',
          descripcion: 'Unidad de volumen.',
          factorConversion: ''
        },
        {
          unidadMedida: 'Kilogramos',
          descripcion: 'Unidad de peso.',
          factorConversion: ''
        },
        {
          unidadMedida: 'Galones',
          descripcion: 'Unidad de volumen.',
          factorConversion: '1 galón = 3.785 litros'
        },
        {
          unidadMedida: 'Cilindros',
          descripcion: 'Unidad de volumen.',
          factorConversion: '1 cilindro = 37.85 litros'
        },
        {
          unidadMedida: 'Toneladas',
          descripcion: 'Unidad de peso.',
          factorConversion: '1 tonelada = 1000 kilogramos'
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const unidadExists = await unidadRepository.findOneBy({ unidadMedida: element.unidadMedida });
        if (!unidadExists) {
          dataToInsert.push(element);
        }
      }
      
      await unidadRepository.insert(dataToInsert);
      console.log("Unidades de medida de tipos de residuos insertados correctamente");
    } catch (error) {
      console.error('Error en el UnidadMedidaTipoResiduoSeeder:', error);
    }
    
  }

 
}