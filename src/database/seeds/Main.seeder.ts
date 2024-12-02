import { Seeder, SeederFactoryManager, runSeeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import AbogadoSeeder from './Abogado.seeder';
import ClienteSeeder from './Cliente.seeder';
import UsuarioSeeder from './Usuario.seeder';
import ServicioSeeder from './Servicio.seeder';
import EspecialidadSeeder from './Especialidad.seeder';
import IndustriaSeeder from './Industria.seeder';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    await runSeeder(dataSource, ServicioSeeder);
    await runSeeder(dataSource, EspecialidadSeeder);
    await runSeeder(dataSource, IndustriaSeeder);
    await runSeeder(dataSource, AbogadoSeeder);
    await runSeeder(dataSource, ClienteSeeder);
    await runSeeder(dataSource, UsuarioSeeder);
  }
}