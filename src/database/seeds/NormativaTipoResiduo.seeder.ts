import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TiposResiduoEntity } from 'src/modules/mantenimiento/tiposResiduo/entities/tiposResiduo.entity';

export default class NormativaTipoResiduoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const tipoResiduoRepository =  dataSource.getRepository(TiposResiduoEntity);
      const data = [
        {
          codigo: 're01',
          nombre: 'Aceite de motor usado',
          descripcion: 'El aceite de motor utilizado en vehículos y maquinaria, que se descarta cuando se realiza un cambio de aceite.',
          nivelPeligro: 1,
          metodoAlmacenamiento: 2
        },
        {
          codigo: 're02',
          nombre: 'Aceite de cocina usado',
          descripcion: 'El aceite utilizado para cocinar, que se desecha después de su uso en restaurantes, hogares u otras instalaciones.',
          nivelPeligro: 1,
          metodoAlmacenamiento: 2
        },
        {
          codigo: 're03',
          nombre: 'Combustibles vencidos',
          descripcion: 'Los combustibles que han superado su vida útil o que ya no cumplen con las especificaciones requeridas, como gasolina, diésel, queroseno u otros combustibles.',
          nivelPeligro: 1,
          metodoAlmacenamiento: 2
        },
        {
          codigo: 're04',
          nombre: 'Lubricantes usados',
          descripcion: 'Los lubricantes utilizados en maquinaria y equipos, como aceites lubricantes para motores, engranajes o sistemas hidráulicos.',
          nivelPeligro: 1,
          metodoAlmacenamiento: 2
        },
        {
          codigo: 're05',
          nombre: 'Aceite de transformadores y capacitores',
          descripcion: 'Los aceites utilizados en transformadores eléctricos y capacitores, que pueden contener contaminantes peligrosos como PCB (bifenilos policlorados).',
          nivelPeligro: 1,
          metodoAlmacenamiento: 2
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