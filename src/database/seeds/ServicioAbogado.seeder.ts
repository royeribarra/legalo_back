import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ServiciosEntity } from '../../modules/servicio/servicios.entity';
import { ServiciosAbogadoEntity } from '../../modules/servicio/servicioAbogado.entity';
import { AbogadosEntity } from '../../modules/abogado/entities/abogados.entity';

export default class ServicioAbogadoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const industriaAbogadoRepository = dataSource.getRepository(ServiciosAbogadoEntity);
      const abogadoRepository = dataSource.getRepository(AbogadosEntity);
      const industriaRepository = dataSource.getRepository(ServiciosEntity);

      // Definir las asociaciones de industrias y ofertas
      const associations = [
        { abogadoId: 1, servicios: [1, 2, 3, 4] },
        { abogadoId: 2, servicios: [1, 3, 5] },
        { abogadoId: 3, servicios: [2, 5, 6] },
        { abogadoId: 4, servicios: [1, 7, 9] },
      ];

      const dataToInsert = [];

      for (const { abogadoId, servicios } of associations) {
        // Buscar la oferta correspondiente
        const abogado = await abogadoRepository.findOneBy({ id: abogadoId });
        if (!abogado) {
          console.warn(`Oferta con ID ${abogadoId} no encontrada. Skipping.`);
          continue;
        }

        for (const servicioId of servicios) {
          // Buscar cada industria correspondiente
          const servicio = await industriaRepository.findOneBy({ id: servicioId });
          if (!servicio) {
            console.warn(`Industria con ID ${servicioId} no encontrada. Skipping.`);
            continue;
          }

          // Preparar los datos para la relación
          dataToInsert.push({
            abogado,
            servicio,
          });
        }
      }

      // Insertar las relaciones en la tabla pivot
      await industriaAbogadoRepository.insert(dataToInsert);

      console.log('Servicios y ofertas insertadas correctamente.');
    } catch (error) {
      console.error('Error en el ServicioOfertaSeeder:', error);
    }
  }
}