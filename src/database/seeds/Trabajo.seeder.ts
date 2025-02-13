import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ClientesEntity } from '../../modules/cliente/entities/clientes.entity';
import { ClienteSeederDTO } from '../../modules/cliente/dto/cliente.dto';
import * as bcrypt from 'bcrypt';
import { TrabajosEntity } from '../../modules/trabajo/trabajos.entity';
import { AbogadosEntity } from '../../modules/abogado/entities/abogados.entity';
import { AplicacionesEntity } from '../../modules/aplicacion/aplicaciones.entity';

export default class TrabajoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const trabajoRepository =  dataSource.getRepository(TrabajosEntity);
      const aplicacionRepository =  dataSource.getRepository(AplicacionesEntity);
      const abogadoRepository =  dataSource.getRepository(AbogadosEntity);
      const clienteRepository =  dataSource.getRepository(ClientesEntity);

      const data = [
        {
          estado: 1,
          fecha_fin: "2024-12-01",
          fecha_inicio: "2024-10-05",
          progreso: 3,
          cliente: await clienteRepository.findOneBy({
            id: 1,
          }),
          abogado: await abogadoRepository.findOneBy({
            id: 4,
          }),
          aplicacion: await aplicacionRepository.findOneBy({
            id: 4,
          })
        }
      ];

      const dataToInsert = [];

      for (const element of data) {
          dataToInsert.push(element);
      }

      await trabajoRepository.insert(dataToInsert);
      console.log("Trabajos insertados correctamente");
    } catch (error) {
      console.error('Error en el TrabajoSeeder:', error);
    }
  }
}