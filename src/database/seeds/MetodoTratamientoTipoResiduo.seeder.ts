import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { MetodosTratamientoResiduoEntity } from '../../modules/mantenimiento/tiposResiduo/entities/metodosTratamientoResiduo.entity';
import { MetodoTratamientoTipoResiduoDTO } from '../../modules/mantenimiento/tiposResiduo/dto/medidaTratamientoTipoResiduo.dto';

export default class MetodoTratamientoTipoResiduoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const tratamientoRepository =  dataSource.getRepository(MetodosTratamientoResiduoEntity);
      const data : MetodoTratamientoTipoResiduoDTO[] = [
        {
          nombre: 'Reciclaje',
          descripcion: 'El reciclaje es un método efectivo para el tratamiento de muchos tipos de residuos peligrosos, aceites usados y combustibles contaminados. A través del reciclaje, estos materiales se procesan y se les da una nueva utilidad, reduciendo la necesidad de extraer y fabricar nuevos productos. Por ejemplo, los aceites usados pueden ser refinados y reutilizados como combustible o lubricante.',
          valor: 1
        },
        {
          nombre: 'Tratamiento físico',
          descripcion: 'El tratamiento físico implica el uso de técnicas mecánicas o físicas para tratar los residuos. Esto puede incluir la separación de componentes, como la filtración o la centrifugación, para eliminar contaminantes o sustancias no deseadas. También puede implicar la reducción de volumen mediante compactación o trituración.',
          valor: 1
        },
        {
          nombre: 'Tratamiento químico',
          descripcion: ' El tratamiento químico se utiliza para transformar los residuos peligrosos, aceites usados y combustibles contaminados en formas menos peligrosas o más fáciles de manejar. Esto puede implicar reacciones químicas para descomponer o neutralizar los componentes peligrosos, convirtiéndolos en productos más estables y menos dañinos.',
          valor: 1
        },
        {
          nombre: 'Incineración',
          descripcion: 'La incineración es un proceso de tratamiento que implica la combustión controlada de los residuos a altas temperaturas. Este método es especialmente adecuado para residuos peligrosos y combustibles contaminados, ya que puede destruir los contaminantes y reducir el volumen de los residuos. Sin embargo, es importante contar con sistemas de control de emisiones para evitar la liberación de gases y partículas contaminantes al medio ambiente.',
          valor: 1
        },
        {
          nombre: 'Disposición segura',
          descripcion: 'Cuando otros métodos de tratamiento no son viables, se puede recurrir a la disposición segura de los residuos peligrosos, aceites usados y combustibles contaminados. Esto puede incluir su confinamiento en instalaciones adecuadas, como rellenos sanitarios o depósitos especiales, donde se minimiza el riesgo de liberación de contaminantes al suelo o al agua subterránea.',
          valor: 1
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const tratamientoExists = await tratamientoRepository.findOneBy({ nombre: element.nombre });
        if (!tratamientoExists) {
          dataToInsert.push(element);
        }
      }
      
      await tratamientoRepository.insert(dataToInsert);
      console.log("Metodos de tratamiento de tipos de residuos insertados correctamente");
    } catch (error) {
      console.error('Error en el MetodoTratamientoTipoResiduoSeeder:', error);
    }
    
  }

 
}