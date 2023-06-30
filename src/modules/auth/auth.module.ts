import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsuariosModule } from '../mantenimiento/usuarios/usuarios.module';
import { UsuariosService } from '../mantenimiento/usuarios/services/usuarios.service';
import { JwtService } from './jwt/jwt.service';

@Global()
@Module({
  imports: [
    UsuariosModule
  ],
  providers: [
    AuthService,
    UsuariosService,
    JwtService
  ],
  controllers: [
    AuthController
  ]
})

export class AuthModule {}
