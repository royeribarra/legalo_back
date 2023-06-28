import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsuariosModule } from '../mantenimiento/usuarios/usuarios.module';

@Global()
@Module({
  imports: [
    UsuariosModule
  ],
  providers: [
    AuthService
  ],
  controllers: [
    AuthController
  ]
})

export class AuthModule {}
