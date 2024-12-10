import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { OfertasEntity } from '../../modules/oferta/oferta.entity';
import { ServiciosOfertaEntity } from '../../modules/servicio/servicioOferta.entity';
import { ServiciosEntity } from '../../modules/servicio/servicios.entity';

export default class ServicioOfertaSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const industriaServicioRepository = dataSource.getRepository(ServiciosOfertaEntity);
      const ofertaRepository = dataSource.getRepository(OfertasEntity);
      const industriaRepository = dataSource.getRepository(ServiciosEntity);

      const associations = [
        { ofertaId: 1, servicios: [1, 2, 3, 4] },
        { ofertaId: 2, servicios: [4, 5, 6] },
        { ofertaId: 3, servicios: [1, 2, 3] },
        { ofertaId: 4, servicios: [7, 8] },
      ];

      const dataToInsert = [];

      for (const { ofertaId, servicios } of associations) {
        const oferta = await ofertaRepository.findOneBy({ id: ofertaId });
        if (!oferta) {
          console.warn(`Oferta con ID ${ofertaId} no encontrada. Skipping.`);
          continue;
        }

        for (const servicioId of servicios) {
          const servicio = await industriaRepository.findOneBy({ id: servicioId });
          if (!servicio) {
            console.warn(`Industria con ID ${servicioId} no encontrada. Skipping.`);
            continue;
          }

          dataToInsert.push({
            oferta,
            servicio,
          });
        }
      }

      await industriaServicioRepository.insert(dataToInsert);

      console.log('Servicios y ofertas insertadas correctamente.');
    } catch (error) {
      console.error('Error en el ServicioOfertaSeeder:', error);
    }
  }
}