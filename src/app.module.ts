import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AbogadoModule } from './modules/abogado/abogado.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { FileModule } from './modules/tmp/file.module';
import { OfertaModule } from './modules/oferta/oferta.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ServicioModule } from './modules/servicio/servicio.module';
import { IndustriaModule } from './modules/industria/industria.module';
import { EspecialidadModule } from './modules/especialidad/especialidad.module';
import { PagoModule } from './modules/pago/pago.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { S3Module } from './modules/s3/s3.module';
import { AplicacionesModule } from './modules/aplicacion/aplicacion.module';
import { TrabajosModule } from './modules/trabajo/trabajo.module';
import { LibroReclamacionesModule } from './modules/libro-reclamaciones/libro-reclamaciones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    NestjsFormDataModule,
    AuthModule,
    AbogadoModule,
    ClienteModule,
    FileModule,
    OfertaModule,
    ServicioModule,
    IndustriaModule,
    EspecialidadModule,
    PagoModule,
    AplicacionesModule,
    S3Module,
    TrabajosModule,
    LibroReclamacionesModule,
    ServeStaticModule.forRoot({
      rootPath: join(join(process.cwd(), 'public')),
      serveRoot: '/public'
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  onModuleInit() {
    this.logger.log('AppModule initialized'); // Log global al inicializar el módulo
  }
}