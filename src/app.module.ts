import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module.js';
import { AbogadoModule } from './modules/abogado/abogado.module.js';
import { ClienteModule } from './modules/cliente/cliente.module.js';
import { FileModule } from './modules/tmp/file.module.js';
import { OfertaModule } from './modules/oferta/oferta.module.js';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ServicioModule } from './modules/servicio/servicio.module.js';
import { IndustriaModule } from './modules/industria/industria.module.js';
import { EspecialidadModule } from './modules/especialidad/especialidad.module.js';
import { PagoModule } from './modules/pago/pago.module.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { S3Module } from './modules/s3/s3.module.js';
import { AplicacionesModule } from './modules/aplicacion/aplicacion.module.js';
import { TrabajosModule } from './modules/trabajo/trabajo.module.js';
import { LibroReclamacionesModule } from './modules/libro-reclamaciones/libro-reclamaciones.module.js';
import { PagoAbogadoModule } from './modules/pagoAbogado/pagoAbogado.module.js';
import { LogModule } from './modules/log/log.module.js';
import { PdfModule } from './modules/pdf/pdf.module.js';
import dataSource from './config/data.source.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSource.options),
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
    PagoAbogadoModule,
    PdfModule,
    LogModule,
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