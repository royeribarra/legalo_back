import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SucursalesClienteEntity } from './entities/sucursalesCliente.entity';
import { SucursalesClienteService } from './services/sucursalesCliente.service';
import { SucursalesClienteController } from './controllers/sucursalesCliente.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SucursalesClienteEntity])
  ],
  providers: [
    SucursalesClienteService
  ],
  controllers: [
    SucursalesClienteController
  ]
})

export class SucursalesClienteModule {}
