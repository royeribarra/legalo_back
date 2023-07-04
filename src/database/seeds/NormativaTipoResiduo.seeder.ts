import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { NormativasResiduoEntity } from '../../modules/mantenimiento/tiposResiduo/entities/normativasResiduo.entity';
import { NormativaTipoResiduoDTO } from '../../modules/mantenimiento/tiposResiduo/dto/normativaTipoResiduo.dto';

export default class NormativaTipoResiduoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const normativaRepository =  dataSource.getRepository(NormativasResiduoEntity);
      const data : NormativaTipoResiduoDTO []= [
        {
          nombre: 'Convenio de Basilea',
          descripcion: 'Es un tratado internacional que tiene como objetivo controlar los movimientos transfronterizos de residuos peligrosos y su eliminación. Establece obligaciones para los países en términos de notificación, consentimiento y seguimiento de los movimientos de estos residuos.',
          valor: 2
        },
        {
          nombre: 'Reglamento REACH',
          descripcion: 'Es una regulación de la Unión Europea que aborda el registro, evaluación, autorización y restricción de sustancias químicas. Tiene como objetivo garantizar un alto nivel de protección de la salud humana y del medio ambiente en relación con los productos químicos, incluidos los residuos peligrosos.',
          valor: 2
        },
        {
          nombre: 'Reglamento CLP',
          descripcion: 'También es una regulación de la Unión Europea que establece normas para la clasificación, etiquetado y envasado de sustancias y mezclas químicas. Contribuye a la identificación y comunicación adecuada de los riesgos asociados con los residuos peligrosos.',
          valor: 2
        },
        {
          nombre: 'Normas ISO 14000',
          descripcion: 'Son una serie de normas internacionales relacionadas con la gestión ambiental. Entre ellas, la norma ISO 14001 establece los requisitos para implementar un sistema de gestión ambiental efectivo, que incluye consideraciones sobre la gestión de residuos peligrosos.',
          valor: 2
        },
        {
          nombre: 'Normativas nacionales',
          descripcion: 'Cada país cuenta con sus propias regulaciones y leyes relacionadas con los residuos peligrosos, aceites usados y combustibles contaminados. Estas normativas pueden variar en términos de clasificación, transporte, almacenamiento, tratamiento y disposición final de estos materiales.',
          valor: 2
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const residuoExists = await normativaRepository.findOneBy({ nombre: element.nombre});
        if (!residuoExists) {
          dataToInsert.push(element);
        }
      }
      
      await normativaRepository.insert(dataToInsert);
      console.log("Normativas de tipos de residuos insertados correctamente");
    } catch (error) {
      console.error('Error en el NormativaTipoResiduoSeeder:', error);
    }
    
  }

 
}