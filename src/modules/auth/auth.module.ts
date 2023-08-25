import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsuariosModule } from '../mantenimiento/usuarios/usuarios.module';
import { UsuariosService } from '../mantenimiento/usuarios/services/usuarios.service';
import { JwtService } from './jwt/jwt.service';
import { ClientesService } from '../solicitudes/clientes/services/clientes.service';
import { SucursalesClienteService } from '../solicitudes/sucursalesCliente/services/sucursalesCliente.service';
import { ClientesEntity } from '../solicitudes/clientes/entities/clientes.entity';
import { SucursalesClienteEntity } from '../solicitudes/sucursalesCliente/entities/sucursalesCliente.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientesEntity,
      SucursalesClienteEntity
    ]),
    UsuariosModule,
  ],
  providers: [
    AuthService,
    UsuariosService,
    JwtService,
    ClientesService,
    SucursalesClienteService
  ],
  controllers: [
    AuthController
  ]
})

export class AuthModule {}
