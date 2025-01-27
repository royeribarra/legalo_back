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
    const abogado1 = await abogadoRepository.findOneBy({
      correo: 'royer@gmail.com',
    });
    const abogado2 = await abogadoRepository.findOneBy({
      correo: 'mariana.perez@example.com',
    });
    const abogado3 = await abogadoRepository.findOneBy({
      correo: 'carlos.martinez@example.com',
    });
    const abogado4 = await abogadoRepository.findOneBy({
      correo: 'laura.gomez@example.com',
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
          abogado: abogado1,
          cliente: null,
          isActive: true
        },
        {
          nombres: 'Magaly',
          apellidos: 'Granados',
          correo: 'cliente@gmail.com',
          usuario: 'user70049277',
          contrasena: await bcrypt.hash('cliente123', +process.env.HASH_SALT),
          dni: '70049277',
          telefono: '964973017',
          perfil: 'cliente',
          abogado: null,
          cliente: cliente,
          isActive: true
        },
        {
          nombres: 'Mariana',
          apellidos: 'Pérez López',
          correo: 'mariana.perez@example.com',
          usuario: 'user12345678',
          contrasena: await bcrypt.hash('ingeniera456', +process.env.HASH_SALT),
          dni: '12345678',
          telefono: '987654321',
          perfil: 'abogado',
          abogado: abogado2,
          cliente: null,
          isActive: true
        },
        {
          nombres: 'Carlos',
          apellidos: 'Martinez',
          correo: 'carlos.martinez@example.com',
          usuario: 'user98765432',
          contrasena: await bcrypt.hash('abogado789', +process.env.HASH_SALT),
          dni: '98765432',
          telefono: '912345678',
          perfil: 'abogado',
          abogado: abogado3,
          cliente: null,
          isActive: true
        },
        {
          nombres: 'Laura',
          apellidos: 'Gómez',
          correo: 'laura.gomez@example.com',
          usuario: 'user56473821',
          contrasena: await bcrypt.hash('abogado234', +process.env.HASH_SALT),
          dni: '56473821',
          telefono: '965432109',
          perfil: 'abogado',
          abogado: abogado4,
          cliente: null,
          isActive: true
        },
        {
          nombres: 'Admin',
          apellidos: 'Admin',
          correo: 'admin@admin.com',
          usuario: 'userAdmin',
          contrasena: await bcrypt.hash('secret123', +process.env.HASH_SALT),
          dni: '99999999',
          telefono: '999999999',
          perfil: 'admin',
          abogado: null,
          cliente: null,
          isActive: true
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
      console.error('Error en el usuarioSeeder:', error);
    }
  }
}