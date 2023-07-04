import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { PropiedadTipoResiduoDTO } from '../../modules/mantenimiento/tiposResiduo/dto/propiedadTipoResiduo.dto';
import { PropiedadesResiduoEntity } from '../../modules/mantenimiento/tiposResiduo/entities/propiedadesResiduo.entity';

export default class PropiedadTipoResiduoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const propiedadRepository =  dataSource.getRepository(PropiedadesResiduoEntity);
      const data : PropiedadTipoResiduoDTO []= [
        {
          nombre: 'Toxicidad',
          descripcion: 'Los residuos peligrosos, los aceites usados y los combustibles contaminados pueden contener sustancias químicas tóxicas que representan un riesgo para los seres vivos y el medio ambiente. Estas sustancias pueden tener efectos agudos o crónicos, y pueden ser carcinógenas, mutagénicas o teratogénicas.',
          valor: 1,
        },
        {
          nombre: 'Inflamabilidad',
          descripcion: 'Algunos residuos peligrosos, aceites usados y combustibles contaminados pueden ser inflamables y representar un riesgo de incendio o explosión. Estos materiales pueden tener puntos de inflamación bajos y emitir vapores inflamables.',
          valor: 1,
        },
        {
          nombre: 'Reactividad',
          descripcion: 'Algunos residuos peligrosos y combustibles contaminados pueden ser altamente reactivos y tener la capacidad de reaccionar violentamente con otras sustancias, generar gases tóxicos o inflamables, o liberar calor o energía.',
          valor: 1,
        },
        {
          nombre: 'Corrosividad',
          descripcion: 'Algunos residuos peligrosos y aceites usados pueden ser corrosivos, lo que significa que tienen la capacidad de dañar o destruir materiales y estructuras, como metales, con los que entran en contacto.',
          valor: 1,
        },
        {
          nombre: 'Persistencia',
          descripcion: 'Algunos residuos peligrosos y aceites usados pueden ser persistentes en el medio ambiente, lo que significa que no se degradan fácilmente y pueden persistir durante largos períodos de tiempo, causando impactos ambientales a largo plazo.',
          valor: 1,
        },
        {
          nombre: 'Solubilidad',
          descripcion: 'Algunos residuos peligrosos y aceites usados pueden ser solubles en agua, lo que aumenta su capacidad de contaminar cuerpos de agua subterránea y superficial.',
          valor: 1,
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const propiedadExists = await propiedadRepository.findOneBy({ nombre: element.nombre });
        if (!propiedadExists) {
          dataToInsert.push(element);
        }
      }
      
      await propiedadRepository.insert(dataToInsert);
      console.log("Propiedades de tipos de residuos insertados correctamente");
    } catch (error) {
      console.error('Error en el PropiedadTipoResiduoSeeder:', error);
    }
    
  }

 
}