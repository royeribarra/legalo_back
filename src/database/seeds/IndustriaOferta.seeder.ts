import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { IndustriasEntity } from '../../modules/industria/industrias.entity';
import { IndustriasOfertaEntity } from '../../modules/industria/industriaOferta.entity';
import { OfertasEntity } from '../../modules/oferta/oferta.entity';

export default class IndustriaOfertaSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const industriaOfertaRepository = dataSource.getRepository(IndustriasOfertaEntity);
      const ofertaRepository = dataSource.getRepository(OfertasEntity);
      const industriaRepository = dataSource.getRepository(IndustriasEntity);

      const associations = [
        { ofertaId: 1, industrias: [1, 2, 3, 4] },
        { ofertaId: 2, industrias: [4, 5, 6] },
        { ofertaId: 3, industrias: [1, 2, 3] },
        { ofertaId: 4, industrias: [7, 8] },
      ];

      const dataToInsert = [];

      for (const { ofertaId, industrias } of associations) {
        // Buscar la oferta correspondiente
        const oferta = await ofertaRepository.findOneBy({ id: ofertaId });
        if (!oferta) {
          console.warn(`Oferta con ID ${ofertaId} no encontrada. Skipping.`);
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
            oferta,
            industria,
          });
        }
      }

      // Insertar las relaciones en la tabla pivot
      await industriaOfertaRepository.insert(dataToInsert);

      console.log('Industrias y ofertas insertadas correctamente.');
    } catch (error) {
      console.error('Error en el IndustriaOfertaSeeder:', error);
    }
  }
}