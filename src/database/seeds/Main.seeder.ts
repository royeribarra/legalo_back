import { Seeder, SeederFactoryManager, runSeeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import AbogadoSeeder from './Abogado.seeder';
import ClienteSeeder from './Cliente.seeder';
import UsuarioSeeder from './Usuario.seeder';
import ServicioSeeder from './Servicio.seeder';
import EspecialidadSeeder from './Especialidad.seeder';
import IndustriaSeeder from './Industria.seeder';
import OfertaSeeder from './Oferta.seeder';
import AplicacionSeeder from './Aplicacion.seeder';
import EspecialidadAbogadoSeeder from './EspecialidadAbogado.seeder';
import EspecialidadOfertaSeeder from './EspecialidadOferta.seeder';
import IndustriaAbogadoSeeder from './IndustriaAbogado.seeder';
import IndustriaOfertaSeeder from './IndustriaOferta.seeder';
import ServicioAbogadoSeeder from './ServicioAbogado.seeder';
import ServicioOfertaSeeder from './ServicioOferta.seeder';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    await runSeeder(dataSource, ServicioSeeder);
    await runSeeder(dataSource, EspecialidadSeeder);
    await runSeeder(dataSource, IndustriaSeeder);
    // await runSeeder(dataSource, AbogadoSeeder);
    // await runSeeder(dataSource, ClienteSeeder);
    // await runSeeder(dataSource, UsuarioSeeder);
    // await runSeeder(dataSource, OfertaSeeder);
    // await runSeeder(dataSource, AplicacionSeeder);
    // await runSeeder(dataSource, EspecialidadAbogadoSeeder);
    // await runSeeder(dataSource, EspecialidadOfertaSeeder);
    // await runSeeder(dataSource, IndustriaAbogadoSeeder);
    // await runSeeder(dataSource, IndustriaOfertaSeeder);
    // await runSeeder(dataSource, ServicioAbogadoSeeder);
    // await runSeeder(dataSource, ServicioOfertaSeeder);
  }
}