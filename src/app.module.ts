import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AbogadoModule } from './modules/abogado/abogado.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { TmpModule } from './modules/tmp/tmp.module';
import { OfertaModule } from './modules/oferta/oferta.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    AuthModule,
    AbogadoModule,
    ClienteModule,
    TmpModule,
    OfertaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}