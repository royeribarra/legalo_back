import { Seeder, SeederFactoryManager, runSeeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import RolSeeder from './Rol.seeder';
import UsuarioSeeder from './Usuario.seeder';
import ClienteSeeder from './Cliente.seeder';
import SucursalClienteSeeder from './SucursalCliente.seeder';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    await runSeeder(dataSource, RolSeeder);
    await runSeeder(dataSource, UsuarioSeeder);
    await runSeeder(dataSource, ClienteSeeder);
    await runSeeder(dataSource, SucursalClienteSeeder);
  }
}