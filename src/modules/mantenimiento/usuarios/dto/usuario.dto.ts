import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean, IsEmail } from 'class-validator';
import { RolesEntity } from '../../roles/entities/roles.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellido: string;

  @ApiProperty()
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @IsNotEmpty()
  @IsString()
  correo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  usuario: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contrasena: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  direccion: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  distrito: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  provincia: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dni: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  telefono: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rolId: number;
}

export class UsuarioUpdateDTO{
  @ApiProperty()
  @IsOptional()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  apellido: string;

  @ApiProperty()
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @IsOptional()
  correo: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  usuario: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contrasena: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  direccion: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  distrito: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  provincia: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  dni: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  telefono: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  rolId: number;
}

export class UsuarioSeederDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellido: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  correo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  usuario: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contrasena: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  direccion: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  distrito: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  provincia: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dni: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  rol: RolesEntity;
}
