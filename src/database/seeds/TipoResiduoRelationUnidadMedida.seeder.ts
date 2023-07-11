import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TiposResiduoUnidadMedidaEntity } from '../../modules/mantenimiento/tiposResiduo/entities/tiposResiduoUnidadMedida.entity';
import { UnidadesMedidaResiduoEntity } from '../../modules/mantenimiento/tiposResiduo/entities/unidadesMedidaResiduo.entity';
import { TiposResiduoEntity } from '../../modules/mantenimiento/tiposResiduo/entities/tiposResiduo.entity';

export default class TipoResiduoRelationUnidadMedidaSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const unidadRepository =  dataSource.getRepository(UnidadesMedidaResiduoEntity);
    const residuoRepository =  dataSource.getRepository(TiposResiduoEntity);
    const repository =  dataSource.getRepository(TiposResiduoUnidadMedidaEntity);
    try {
      const unidades = await unidadRepository.find();
      const residuos = await residuoRepository.find();
      const data = [
        //primero
        {
          unidadMedida: unidades[0],
          tipoResiduo: residuos[0]
        },
        {
          unidadMedida: unidades[1],
          tipoResiduo: residuos[0]
        },
        //segundo
        {
          unidadMedida: unidades[0],
          tipoResiduo: residuos[1]
        },
        {
          unidadMedida: unidades[1],
          tipoResiduo: residuos[1]
        },
        //tercero
        {
          unidadMedida: unidades[0],
          tipoResiduo: residuos[2]
        },
        {
          unidadMedida: unidades[2],
          tipoResiduo: residuos[2]
        },
        //cuarto
        {
          unidadMedida: unidades[0],
          tipoResiduo: residuos[3]
        },
        {
          unidadMedida: unidades[1],
          tipoResiduo: residuos[3]
        },
        //quinto
        {
          unidadMedida: unidades[0],
          tipoResiduo: residuos[4]
        },
        {
          unidadMedida: unidades[1],
          tipoResiduo: residuos[4]
        },
        {
          unidadMedida: unidades[2],
          tipoResiduo: residuos[4]
        },
        {
          unidadMedida: unidades[3],
          tipoResiduo: residuos[4]
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const exists = await repository.findOneBy({ tipoResiduo: element.tipoResiduo, unidadMedida: element.unidadMedida });
        if (!exists) {
          dataToInsert.push(element);
        }
      }
      
      await repository.insert(dataToInsert);
      console.log("TipoResiduoRelationUnidadMedidaSeeder de tipos de residuos insertados correctamente");
    } catch (error) {
      console.error('Error en el TipoResiduoRelationUnidadMedidaSeeder:', error);
    }
    
  }

 
}