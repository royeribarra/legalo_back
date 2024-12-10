import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { OfertasEntity } from '../../modules/oferta/oferta.entity';
import { EspecialidadesOfertaEntity } from '../../modules/especialidad/especialidadOferta.entity';
import { EspecialidadesEntity } from '../../modules/especialidad/especialidades.entity';

export default class EspecialidadOfertaSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const industriaOfertaRepository = dataSource.getRepository(EspecialidadesOfertaEntity);
      const ofertaRepository = dataSource.getRepository(OfertasEntity);
      const industriaRepository = dataSource.getRepository(EspecialidadesEntity);

      // Definir las asociaciones de industrias y ofertas
      const associations = [
        { ofertaId: 1, especialidades: [1, 2, 3, 4] },
        { ofertaId: 2, especialidades: [4, 5, 6] },
        { ofertaId: 3, especialidades: [2, 4, 6] },
        { ofertaId: 4, especialidades: [1, 5] },
      ];

      const dataToInsert = [];

      for (const { ofertaId, especialidades } of associations) {
        // Buscar la oferta correspondiente
        const oferta = await ofertaRepository.findOneBy({ id: ofertaId });
        if (!oferta) {
          console.warn(`Oferta con ID ${ofertaId} no encontrada. Skipping.`);
          continue;
        }

        for (const especialidadId of especialidades) {
          // Buscar cada industria correspondiente
          const especialidad = await industriaRepository.findOneBy({ id: especialidadId });
          if (!especialidad) {
            console.warn(`Industria con ID ${especialidadId} no encontrada. Skipping.`);
            continue;
          }

          // Preparar los datos para la relación
          dataToInsert.push({
            oferta,
            especialidad,
          });
        }
      }

      // Insertar las relaciones en la tabla pivot
      await industriaOfertaRepository.insert(dataToInsert);

      console.log('Especialidades y ofertas insertadas correctamente.');
    } catch (error) {
      console.error('Error en el EspecialidadOfertaSeeder:', error);
    }
  }
}