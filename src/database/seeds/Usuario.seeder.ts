import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UsuariosEntity } from '../../modules/usuario/usuarios.entity';
import * as bcrypt from 'bcrypt';
import { UsuarioSeederDTO } from '../../modules/usuario/usuario.dto';
import { AbogadosEntity } from '../../modules/abogado/entities/abogados.entity';
import { ClientesEntity } from '../../modules/cliente/entities/clientes.entity';

export default class UsuarioSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userrepository =  dataSource.getRepository(UsuariosEntity);
    const abogadoRepository =  dataSource.getRepository(AbogadosEntity);
    const clienteRepository =  dataSource.getRepository(ClientesEntity);
    const abogado = await abogadoRepository.findOneBy({
        correo: 'royer@gmail.com',
    });
    const cliente = await clienteRepository.findOneBy({
        correo: 'magaly@gmail.com',
    })

    try {
      const data : UsuarioSeederDTO[] = [
        {
          nombres: 'Royer',
          apellidos: 'Ibarra',
          correo: 'royer@gmail.com',
          usuario: 'user70019408',
          contrasena: await bcrypt.hash('abogado123', +process.env.HASH_SALT),
          dni: '70019408',
          telefono: '939784580',
          perfil: 'abogado',
          abogado: abogado,
          cliente: null
        },
        {
            nombres: 'Magaly',
            apellidos: 'Granados',
            correo: 'magaly@gmail.com',
            usuario: 'user70049277',
            contrasena: await bcrypt.hash('cliente123', +process.env.HASH_SALT),
            dni: '70049277',
            telefono: '964973017',
            perfil: 'cliente',
            abogado: null,
            cliente: cliente
        }
      ];

      const dataToInsert = [];

      for (const element of data) {
        const userExists = await userrepository.findOneBy({ correo: element.correo, usuario: element.usuario, dni: element.dni });
        if (!userExists) {
          dataToInsert.push(element);
        }
      }
      
      await userrepository.insert(dataToInsert);
      console.log("Usuarios insertados correctamente");
    } catch (error) {
      console.error('Error en el userSeeder:', error);
    }
  }
}