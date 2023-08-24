import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TiposResiduoEntity } from '../../modules/mantenimiento/tiposResiduo/entities/tiposResiduo.entity';
import { TipoResiduoDTO } from 'src/modules/mantenimiento/tiposResiduo/dto/tipoResiduo.dto';

export default class TipoResiduoSeeder implements Seeder {
  
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const tipoResiduoRepository =  dataSource.getRepository(TiposResiduoEntity);
      const data : TipoResiduoDTO[] = [
        {
          codigo: 'so-01',
          nombre: 'Absorbentes usados',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'li-01',
          nombre: 'Aceite usado',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 2,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-02',
          nombre: 'Acerrin contaminado',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'li-02',
          nombre: 'Agua contaminada',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 2,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'li-03',
          nombre: 'Agua oleosa',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 2,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'li-04',
          nombre: 'Agua residual',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 2,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-03',
          nombre: 'Arena contaminada',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-04',
          nombre: 'Bandeja antiderrame',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-05',
          nombre: 'Barro contaminado',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-06',
          nombre: 'Borras ácidas',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-07',
          nombre: 'Coques',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'li-05',
          nombre: 'Efluentes líquidos',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 2,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'li-06',
          nombre: 'Filtro de aceite usado',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 2,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-08',
          nombre: 'Filtro de aire usado',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-09',
          nombre: 'Filtro de petroleo usado',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'li-07',
          nombre: 'Grasa',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 2,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-10',
          nombre: 'Lodo contaminado',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'li-08',
          nombre: 'Refrigerante usado',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 2,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-11',
          nombre: 'Residuos peligroso varios',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-12',
          nombre: 'Residuo contaminados (trapos y cartón)',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-13',
          nombre: 'Residuos peligrosos solventes usados',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-14',
          nombre: 'Tierra contaminada',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-15',
          nombre: 'Trapos contaminados',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-16',
          nombre: 'Trapos contaminados y varios',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
        },
        {
          codigo: 'so-17',
          nombre: 'Trapos industriales contaminados',
          nivelPeligro: "",
          metodoAlmacenamiento: null,
          tipo: 1,
          disposicionFinal: "",
          responsable: ""
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