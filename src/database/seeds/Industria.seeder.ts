import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { IndustriasEntity } from '../../modules/industria/industrias.entity';

export default class IndustriaSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const servicioRepository =  dataSource.getRepository(IndustriasEntity);
      const data= [
        {
            nombre: "Banca y Finanzas"
        },
        {
            nombre: "Telecomunicaciones"
        },
        {
            nombre: "Tecnología e Innovación"
        },
        {
            nombre: "Construcción e Infraestructura"
        },
        {
            nombre: "Energía y Recursos Naturales"
        },
        {
            nombre: "Salud "
        },
        {
            nombre: "Agricultura y Agroindustria"
        },
        {
            nombre: "Retail y Consumo Masivo"
        },
        {
            nombre: "Transporte y Logística"
        },
        {
            nombre: "Medios y Entretenimiento"
        },
        {
            nombre: "Inmobiliario"
        },
        {
            nombre: "Seguros"
        },
        {
            nombre: "Gobierno y Políticas Públicas"
        },
        {
            nombre: "Educación"
        },
        {
            nombre: "Manufactura"
        },
        {
            nombre: "Minería y Petróleo"
        },
        {
            nombre: "Turismo y Hotelería"
        },
        {
            nombre: "Automotriz"
        },
        {
            nombre: "Comercio Internacional"
        },
        {
            nombre: "E-commerce y Startups"
        },
      ];

      const dataToInsert = [];

      for (const element of data) {
        const clienteExists = await servicioRepository.findOneBy({ nombre: element.nombre });
        if (!clienteExists) {
          dataToInsert.push(element);
        }
      }

      await servicioRepository.insert(dataToInsert);
      console.log("Industrias insertados correctamente");
    } catch (error) {
      console.error('Error en el IndustriaSeeder:', error);
    }
  }
}