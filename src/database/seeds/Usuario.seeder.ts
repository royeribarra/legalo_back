import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UsuariosEntity } from '../../modules/mantenimiento/usuarios/entities/usuarios.entity';
import * as bcrypt from 'bcrypt';
import { IUsuario } from 'src/interfaces/mantenimiento/user.interface';

export default class UsuarioSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    try {
      const userrepository =  dataSource.getRepository(UsuariosEntity);
      const data : IUsuario[] = [
        {
          nombre: 'Jorge',
          apellido: 'Copetrol',
          correo: 'admin@copetrol.com',
          usuario: 'adminCopetrol',
          contrasena: await bcrypt.hash('adminCopetrol', +process.env.HASH_SALT),
          direccion: 'Jiron administrador',
          dni: '20020010',
          telefono: '990393939'
        },
        {
          nombre: 'Susana',
          apellido: 'Copetrol',
          correo: 'comercial@copetrol.com',
          usuario: 'comercialCopetrol',
          contrasena: await bcrypt.hash('comercialCopetrol', +process.env.HASH_SALT),
          direccion: 'Jiron comercial',
          dni: '20020020',
          telefono: '990393940'
        },
        {
          nombre: 'Alex',
          apellido: 'Copetrol',
          correo: 'transporte@copetrol.com',
          usuario: 'transporteCopetrol',
          contrasena: await bcrypt.hash('transporteCopetrol', +process.env.HASH_SALT),
          direccion: 'Jiron transporte',
          dni: '20020030',
          telefono: '990393941'
        },
        {
          nombre: 'Lucciana',
          apellido: 'Copetrol',
          correo: 'calidad@copetrol.com',
          usuario: 'calidadCopetrol',
          contrasena: await bcrypt.hash('calidadCopetrol', +process.env.HASH_SALT),
          direccion: 'Jiron calidad',
          dni: '20020040',
          telefono: '990393943'
        },
        {
          nombre: 'Miguel',
          apellido: 'Copetrol',
          correo: 'cinterno@copetrol.com',
          usuario: 'cinternoCopetrol',
          contrasena: await bcrypt.hash('cinternoCopetrol', +process.env.HASH_SALT),
          direccion: 'Jiron control interno',
          dni: '20020080',
          telefono: '990393950'
        },
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