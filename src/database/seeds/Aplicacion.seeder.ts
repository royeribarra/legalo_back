import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ClientesEntity } from '../../modules/cliente/entities/clientes.entity';
import { ClienteSeederDTO } from '../../modules/cliente/dto/cliente.dto';
import * as bcrypt from 'bcrypt';
import { AplicacionesEntity } from '../../modules/aplicacion/aplicaciones.entity';
import { AbogadosEntity } from '../../modules/abogado/entities/abogados.entity';
import { OfertasEntity } from '../../modules/oferta/oferta.entity';

export default class AplicacionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
        const aplicacionRepository =  dataSource.getRepository(AplicacionesEntity);
        const abogadoRepository =  dataSource.getRepository(AbogadosEntity);
        const ofertaRepository =  dataSource.getRepository(OfertasEntity);
        const data = [
            {
                fecha_aplicacion: '2022-10-20',
                status: 1,
                salarioEsperado: 500,
                abogado: await abogadoRepository.findOneBy({
                    id: 1,
                }),
                oferta: await ofertaRepository.findOneBy({
                    id: 1,
                }),
            },
            {
                fecha_aplicacion: '2022-10-21',
                status: 1,
                salarioEsperado: 600,
                abogado: await abogadoRepository.findOneBy({
                    id: 2,
                }),
                oferta: await ofertaRepository.findOneBy({
                    id: 2,
                }),
            },
            {
                fecha_aplicacion: '2022-10-22',
                status: 1,
                salarioEsperado: 700,
                abogado: await abogadoRepository.findOneBy({
                    id: 3,
                }),
                oferta: await ofertaRepository.findOneBy({
                    id: 1,
                }),
            },
            {
                fecha_aplicacion: '2022-10-23',
                status: 1,
                salarioEsperado: 800,
                abogado: await abogadoRepository.findOneBy({
                    id: 4,
                }),
                oferta: await ofertaRepository.findOneBy({
                    id: 3,
                }),
            },
      ];

      const dataToInsert = [];

      for (const element of data) {
        // const ofertaExists = await aplicacionRepository.findOneBy({ correo: element.correo, documento: element.documento });
        // if (!ofertaExists) {
          dataToInsert.push(element);
        // }
      }

      await aplicacionRepository.insert(dataToInsert);
      console.log("Aplicaciones insertados correctamente");
    } catch (error) {
      console.error('Error en el AplicacionSeeder:', error);
    }
  }
}