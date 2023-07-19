import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UsuariosEntity } from '../../modules/mantenimiento/usuarios/entities/usuarios.entity';
import * as bcrypt from 'bcrypt';
import { UsuarioDTO, UsuarioSeederDTO } from '../../modules/mantenimiento/usuarios/dto/usuario.dto';
import { RolesEntity } from '../../modules/mantenimiento/roles/entities/roles.entity';

export default class UsuarioSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const rolesRepository =  dataSource.getRepository(RolesEntity);
    const userrepository =  dataSource.getRepository(UsuariosEntity);

    const roles = await rolesRepository.find();

    try {
      
      const data : UsuarioSeederDTO[] = [
        {
          nombre: 'Jorge',
          apellido: 'Copetrol',
          correo: 'admin@copetrol.com',
          usuario: 'adminCopetrol',
          contrasena: await bcrypt.hash('adminCopetrol', +process.env.HASH_SALT),
          direccion: 'Jiron administrador',
          dni: '20020010',
          telefono: '990393939',
          distrito: null,
          provincia: null,
          rol: roles[0]
        },
        {
          nombre: 'Susana',
          apellido: 'Copetrol',
          correo: 'comercial@copetrol.com',
          usuario: 'comercialCopetrol',
          contrasena: await bcrypt.hash('comercialCopetrol', +process.env.HASH_SALT),
          direccion: 'Jiron comercial',
          dni: '20020020',
          telefono: '990393940',
          distrito: null,
          provincia: null,
          rol: roles[1]
        },
        {
          nombre: 'Alex',
          apellido: 'Copetrol',
          correo: 'transporte@copetrol.com',
          usuario: 'transporteCopetrol',
          contrasena: await bcrypt.hash('transporteCopetrol', +process.env.HASH_SALT),
          direccion: 'Jiron transporte',
          dni: '20020030',
          telefono: '990393941',
          distrito: null,
          provincia: null,
          rol: roles[2]
        },
        {
          nombre: 'Lucciana',
          apellido: 'Copetrol',
          correo: 'calidad@copetrol.com',
          usuario: 'calidadCopetrol',
          contrasena: await bcrypt.hash('calidadCopetrol', +process.env.HASH_SALT),
          direccion: 'Jiron calidad',
          dni: '20020040',
          telefono: '990393943',
          distrito: null,
          provincia: null,
          rol: roles[3]
        },
        {
          nombre: 'Miguel',
          apellido: 'Copetrol',
          correo: 'cinterno@copetrol.com',
          usuario: 'cinternoCopetrol',
          contrasena: await bcrypt.hash('cinternoCopetrol', +process.env.HASH_SALT),
          direccion: 'Jiron control interno',
          dni: '20020080',
          telefono: '990393950',
          distrito: null,
          provincia: null,
          rol: roles[4]
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