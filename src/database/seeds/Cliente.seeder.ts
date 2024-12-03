import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ClientesEntity } from '../../modules/cliente/entities/clientes.entity';
import { ClienteSeederDTO } from '../../modules/cliente/dto/cliente.dto';
import * as bcrypt from 'bcrypt';

export default class ClienteSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const clienteRepository =  dataSource.getRepository(ClientesEntity);
      const data : ClienteSeederDTO []= [
        {
            nombres: "Magaly",
            apellidos: "Granados",
            contrasena: await bcrypt.hash("cliente123", +process.env.HASH_SALT),
            correo: "magaly@gmail.com",
            documento: "70049277",
            tipo_persona: "natural",
            telefono_contacto: "964973017",
            empresa: "",
            opinion: "Facebook"
        }
      ];

      const dataToInsert = [];

      for (const element of data) {
        const clienteExists = await clienteRepository.findOneBy({ correo: element.correo, documento: element.documento });
        if (!clienteExists) {
          dataToInsert.push(element);
        }
      }

      await clienteRepository.insert(dataToInsert);
      console.log("Clientes insertados correctamente");
    } catch (error) {
      console.error('Error en el ClienteSeeder:', error);
    }
  }
}