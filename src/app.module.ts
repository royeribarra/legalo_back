import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConductoresModule } from './modules/mantenimiento/conductores/condutores.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './modules/mantenimiento/usuarios/usuarios.module';
import { RolesModule } from './modules/mantenimiento/roles/roles.module';
import { ClientesModule } from './modules/solicitudes/clientes/clientes.modulo';
import { SucursalesClienteModule } from './modules/solicitudes/sucursalesCliente/sucursalesCliente.module';
import { SolicitudesModule } from './modules/solicitudes/solicitudes/solicitudes.module';
import { TiposResiduoModule } from './modules/mantenimiento/tiposResiduo/tiposResiduo.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}), 
    ConductoresModule,
    UsuariosModule,
    RolesModule,
    ClientesModule,
    SucursalesClienteModule,
    SolicitudesModule,
    TiposResiduoModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
