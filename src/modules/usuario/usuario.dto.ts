import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean, IsEmail, isNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ClientesEntity } from '../cliente/entities/clientes.entity';
import { AbogadosEntity } from '../abogado/entities/abogados.entity';

export class UsuarioDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @ApiProperty()
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @IsNotEmpty()
  @IsString()
  correo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contrasena: string;

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
  @IsString()
  perfil: string;

  @ApiProperty({ required: false })
  @IsOptional()
  abogadoId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  clienteId?: number;
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
  nombres: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  usuario: string;

  @ApiProperty()
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @IsNotEmpty()
  @IsString()
  correo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contrasena: string;

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
  @IsString()
  perfil: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  abogado: AbogadosEntity;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cliente: ClientesEntity;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
