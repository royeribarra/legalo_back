import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SucursalesClienteEntity } from './entities/sucursalesCliente.entity';
import { SucursalesClienteService } from './services/sucursalesCliente.service';
import { SucursalesClienteController } from './controllers/sucursalesCliente.controller';
import { ClientesService } from '../clientes/services/clientes.service';
import { ClientesEntity } from '../clientes/entities/clientes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SucursalesClienteEntity,
      ClientesEntity
    ])
  ],
  providers: [
    SucursalesClienteService,
    ClientesService,
  ],
  controllers: [
    SucursalesClienteController
  ]
})

export class SucursalesClienteModule {}
