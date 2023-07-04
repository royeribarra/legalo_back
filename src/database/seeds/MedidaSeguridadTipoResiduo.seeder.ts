import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { MedidasSeguridadResiduoEntity } from '../../modules/mantenimiento/tiposResiduo/entities/medidasSeguridadResiduo.entity';
import { MedidaSeguridadTipoResiduoDTO } from '../../modules/mantenimiento/tiposResiduo/dto/medidadSeguridadTipoResiduo.dto';

export default class MedidaSeguridadTipoResiduoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const seguridadRepository =  dataSource.getRepository(MedidasSeguridadResiduoEntity);
      const data : MedidaSeguridadTipoResiduoDTO[] = [
        {
          nombre: 'Clasificación y etiquetado',
          descripcion: 'Los residuos peligrosos, aceites usados y combustibles contaminados deben ser correctamente clasificados y etiquetados de acuerdo con las regulaciones vigentes. Esto permite identificar su naturaleza y peligrosidad, facilitando su manejo adecuado.',
          valor: 1
        },
        {
          nombre: 'Almacenamiento seguro',
          descripcion: 'Se deben establecer áreas designadas y seguras para el almacenamiento temporal de estos materiales. Los recipientes y contenedores utilizados deben ser adecuados para el tipo de residuo y estar correctamente etiquetados. Además, se deben seguir protocolos específicos para prevenir fugas, derrames o cualquier otra forma de contaminación.',
          valor: 1
        },
        {
          nombre: 'Manipulación adecuada',
          descripcion: 'Se deben seguir prácticas seguras durante la manipulación de residuos peligrosos, aceites usados y combustibles contaminados. Esto implica el uso de equipos de protección personal (EPP), como guantes, gafas y ropa de seguridad, así como la adopción de técnicas adecuadas para minimizar la exposición y el riesgo de lesiones.',
          valor: 1
        },
        {
          nombre: 'Transporte seguro',
          descripcion: 'El transporte de estos materiales debe cumplir con regulaciones específicas. Se deben utilizar vehículos adecuados, con contenedores seguros y debidamente etiquetados. Además, se deben seguir los protocolos de embalaje y carga para prevenir derrames y garantizar la seguridad del personal y el medio ambiente.',
          valor: 1
        },
        {
          nombre: 'Tratamiento y disposición final adecuada',
          descripcion: 'Los residuos peligrosos, aceites usados y combustibles contaminados deben ser tratados y dispuestos de acuerdo con las regulaciones y normativas vigentes. Esto puede incluir procesos de reciclaje, reutilización, tratamiento químico, incineración controlada u otras formas de eliminación segura y responsable.',
          valor: 1
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const seguridadExists = await seguridadRepository.findOneBy({ nombre: element.nombre });
        if (!seguridadExists) {
          dataToInsert.push(element);
        }
      }
      
      await seguridadRepository.insert(dataToInsert);
      console.log("Medidades de seguridad de tipos de residuos insertados correctamente");
    } catch (error) {
      console.error('Error en el MedidaSeguridadTipoResiduoSeeder:', error);
    }
    
  }

 
}