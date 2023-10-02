import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TiposResiduoEntity } from '../../modules/mantenimiento/tiposResiduo/entities/tiposResiduo.entity';
import { TipoResiduoSeedDTO } from 'src/modules/mantenimiento/tiposResiduo/dto/tipoResiduo.dto';

export default class TipoResiduoSeeder implements Seeder {
  
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const tipoResiduoRepository =  dataSource.getRepository(TiposResiduoEntity);
      const data : TipoResiduoSeedDTO[] = [
        {
          codigo: 'so-01',
          nombre: 'Absorbentes usados',
          tipo: 1,
        },
        {
          codigo: 'li-01',
          nombre: 'Aceite usado',
          tipo: 2,
        },
        {
          codigo: 'so-02',
          nombre: 'Acerrin contaminado',
          tipo: 1,
        },
        {
          codigo: 'li-02',
          nombre: 'Agua contaminada',
          tipo: 2,
        },
        {
          codigo: 'li-03',
          nombre: 'Agua oleosa',
          tipo: 2,
        },
        {
          codigo: 'li-04',
          nombre: 'Agua residual',
          tipo: 2,
        },
        {
          codigo: 'so-03',
          nombre: 'Arena contaminada',
          tipo: 1,
        },
        {
          codigo: 'so-04',
          nombre: 'Bandeja antiderrame',
          tipo: 1,
        },
        {
          codigo: 'so-05',
          nombre: 'Barro contaminado',
          tipo: 1,
        },
        {
          codigo: 'so-06',
          nombre: 'Borras ácidas',
          tipo: 1,
        },
        {
          codigo: 'so-07',
          nombre: 'Coques',
          tipo: 1,
        },
        {
          codigo: 'li-05',
          nombre: 'Efluentes líquidos',
          tipo: 2,
        },
        {
          codigo: 'li-06',
          nombre: 'Filtro de aceite usado',
          tipo: 2,
        },
        {
          codigo: 'so-08',
          nombre: 'Filtro de aire usado',
          tipo: 1,
        },
        {
          codigo: 'so-09',
          nombre: 'Filtro de petroleo usado',
          tipo: 1,
        },
        {
          codigo: 'li-07',
          nombre: 'Grasa',
          tipo: 2,
        },
        {
          codigo: 'so-10',
          nombre: 'Lodo contaminado',
          tipo: 1,
        },
        {
          codigo: 'li-08',
          nombre: 'Refrigerante usado',
          tipo: 2,
        },
        {
          codigo: 'so-11',
          nombre: 'Residuos peligroso varios',
          tipo: 1,
        },
        {
          codigo: 'so-12',
          nombre: 'Residuo contaminados (trapos y cartón)',
          tipo: 1,
        },
        {
          codigo: 'so-13',
          nombre: 'Residuos peligrosos solventes usados',
          tipo: 1,
        },
        {
          codigo: 'so-14',
          nombre: 'Tierra contaminada',
          tipo: 1,
        },
        {
          codigo: 'so-15',
          nombre: 'Trapos contaminados',
          tipo: 1,
        },
        {
          codigo: 'so-16',
          nombre: 'Trapos contaminados y varios',
          tipo: 1,
        },
        {
          codigo: 'so-17',
          nombre: 'Trapos industriales contaminados',
          tipo: 1,
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const residuoExists = await tipoResiduoRepository.findOneBy({ nombre: element.nombre, codigo: element.codigo });
        if (!residuoExists) {
          dataToInsert.push(element);
        }
      }
      
      await tipoResiduoRepository.insert(dataToInsert);
      console.log("Tipos de residuos insertados correctamente");
    } catch (error) {
      console.error('Error en el TipoResiduoSeeder:', error);
    }
    
  }

 
}