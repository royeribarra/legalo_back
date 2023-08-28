import { Seeder, SeederFactoryManager, runSeeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import RolSeeder from './Rol.seeder';
import UsuarioSeeder from './Usuario.seeder';
import ClienteSeeder from './Cliente.seeder';
import SucursalClienteSeeder from './SucursalCliente.seeder';
import TipoResiduoSeeder from './TipoResiduo.seeder';
import MedidaSeguridadTipoResiduoSeeder from './MedidaSeguridadTipoResiduo.seeder';
import MetodoTratamientoTipoResiduoSeeder from './MetodoTratamientoTipoResiduo.seeder';
import NormativaTipoResiduoSeeder from './NormativaTipoResiduo.seeder';
import PropiedadTipoResiduoSeeder from './PropiedadTipoResiduo.seeder';
import UnidadMedidaTipoResiduoSeeder from './UnidadMedidaTipoResiduo.seeder';
import TipoResiduoRelationUnidadMedidaSeeder from './TipoResiduoRelationUnidadMedida.seeder';
import TipoVehiculoSeeder from './TipoVehiculo.seeder';
import VehiculoSeeder from './Vehiculo.seeder';
import AreaEmpresaSeeder from './AreaEmpresa.seeder';
import ModuloWebSeeder from './ModuloWeb.seeder';
import RolModuloWebSeeder from './RolModuloWeb.seeder';
import ConductorSeeder from './Conductores.seeder';

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    await runSeeder(dataSource, RolSeeder);
    await runSeeder(dataSource, ModuloWebSeeder);
    await runSeeder(dataSource, RolModuloWebSeeder);
    await runSeeder(dataSource, AreaEmpresaSeeder);
    await runSeeder(dataSource, UsuarioSeeder);
    await runSeeder(dataSource, ClienteSeeder);
    await runSeeder(dataSource, SucursalClienteSeeder);
    await runSeeder(dataSource, ConductorSeeder);

    await runSeeder(dataSource, TipoResiduoSeeder);
    await runSeeder(dataSource, UnidadMedidaTipoResiduoSeeder);
    await runSeeder(dataSource, MedidaSeguridadTipoResiduoSeeder);
    await runSeeder(dataSource, MetodoTratamientoTipoResiduoSeeder);
    await runSeeder(dataSource, NormativaTipoResiduoSeeder);
    await runSeeder(dataSource, PropiedadTipoResiduoSeeder);
    await runSeeder(dataSource, TipoResiduoRelationUnidadMedidaSeeder);

    await runSeeder(dataSource, TipoVehiculoSeeder);
    await runSeeder(dataSource, VehiculoSeeder);
  }
}