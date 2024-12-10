import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { EspecialidadesEntity } from '../../modules/especialidad/especialidades.entity';
import { EspecialidadesAbogadoEntity } from '../../modules/especialidad/especialidadAbogado.entity';
import { AbogadosEntity } from '../../modules/abogado/entities/abogados.entity';

export default class EspecialidadAbogadoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const especialidadAbogadoRepository = dataSource.getRepository(EspecialidadesAbogadoEntity);
      const abogadoRepository = dataSource.getRepository(AbogadosEntity);
      const especialidadRepository = dataSource.getRepository(EspecialidadesEntity);

      const associations = [
        { ofertaId: 1, especialidades: [1, 2, 3, 4] },
        { ofertaId: 2, especialidades: [2, 3, 6] },
        { ofertaId: 3, especialidades: [1, 4, 5] },
        { ofertaId: 4, especialidades: [1, 2, 7] },
      ];

      const dataToInsert = [];

      for (const { ofertaId, especialidades } of associations) {
        // Buscar la oferta correspondiente
        const abogado = await abogadoRepository.findOneBy({ id: ofertaId });
        if (!abogado) {
          console.warn(`Oferta con ID ${ofertaId} no encontrada. Skipping.`);
          continue;
        }

        for (const especialidadId of especialidades) {
          // Buscar cada industria correspondiente
          const especialidad = await especialidadRepository.findOneBy({ id: especialidadId });
          if (!especialidad) {
            console.warn(`Industria con ID ${especialidadId} no encontrada. Skipping.`);
            continue;
          }

          // Preparar los datos para la relación
          dataToInsert.push({
            abogado,
            especialidad,
          });
        }
      }

      // Insertar las relaciones en la tabla pivot
      await especialidadAbogadoRepository.insert(dataToInsert);

      console.log('Especialidades y ofertas insertadas correctamente.');
    } catch (error) {
      console.error('Error en el EspecialidadOfertaSeeder:', error);
    }
  }
}