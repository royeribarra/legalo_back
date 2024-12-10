import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { IndustriasEntity } from '../../modules/industria/industrias.entity';
import { IndustriasAbogadoEntity } from '../../modules/industria/industriaAbogado.entity';
import { AbogadosEntity } from '../../modules/abogado/entities/abogados.entity';

export default class IndustriaAbogadoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const industriaAbogadoRepository = dataSource.getRepository(IndustriasAbogadoEntity);
      const abogadoRepository = dataSource.getRepository(AbogadosEntity);
      const industriaRepository = dataSource.getRepository(IndustriasEntity);

      // Definir las asociaciones de industrias y ofertas
      const associations = [
        { abogadoId: 1, industrias: [1, 2, 3, 4] },
        { abogadoId: 2, industrias: [2, 4, 5] },
        { abogadoId: 3, industrias: [4, 6, 9] },
        { abogadoId: 4, industrias: [8, 9] },
      ];

      const dataToInsert = [];

      for (const { abogadoId, industrias } of associations) {
        // Buscar la oferta correspondiente
        const abogado = await abogadoRepository.findOneBy({ id: abogadoId });
        if (!abogado) {
          console.warn(`Abogado con ID ${abogadoId} no encontrada. Skipping.`);
          continue;
        }

        for (const industriaId of industrias) {
          // Buscar cada industria correspondiente
          const industria = await industriaRepository.findOneBy({ id: industriaId });
          if (!industria) {
            console.warn(`Industria con ID ${industriaId} no encontrada. Skipping.`);
            continue;
          }

          // Preparar los datos para la relación
          dataToInsert.push({
            abogado,
            industria,
          });
        }
      }

      // Insertar las relaciones en la tabla pivot
      await industriaAbogadoRepository.insert(dataToInsert);

      console.log('Industrias y ofertas insertadas correctamente.');
    } catch (error) {
      console.error('Error en el IndustriaOfertaSeeder:', error);
    }
  }
}