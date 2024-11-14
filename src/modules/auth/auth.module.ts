import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtService } from './jwt/jwt.service';
import { UsuariosModule } from '../usuario/usuario.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      // ClientesEntity,
    ]),
    UsuariosModule,
  ],
  providers: [
    AuthService,
    // UsuariosService,
    JwtService,
    // ClientesService,
  ],
  controllers: [
    AuthController
  ]
})

export class AuthModule {}
