import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesEntity } from './entities/clientes.entity';
import { ClientesService } from './services/clientes.service';
import { ClientesController } from './controllers/clientes.controller';
import { SucursalesClienteService } from '../sucursalesCliente/services/sucursalesCliente.service';
import { SucursalesClienteEntity } from '../sucursalesCliente/entities/sucursalesCliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientesEntity,
      SucursalesClienteEntity
    ])
  ],
  providers: [
    ClientesService,
    SucursalesClienteService
  ],
  controllers: [
    ClientesController
  ],
  exports:[
    ClientesService
  ]
})

export class ClientesModule {}
