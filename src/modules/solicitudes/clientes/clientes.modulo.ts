import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesEntity } from './entities/clientes.entity';
import { ClientesService } from './services/clientes.service';
import { ClientesController } from './controllers/clientes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientesEntity])
  ],
  providers: [
    ClientesService
  ],
  controllers: [
    ClientesController
  ]
})

export class ClientesModule {}
