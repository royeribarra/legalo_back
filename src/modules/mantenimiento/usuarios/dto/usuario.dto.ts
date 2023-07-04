import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UsuarioDTO{
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsOptional()
  @IsNumber()
  edad: number;

  @IsNotEmpty()
  @IsString()
  correo: string;

  @IsNotEmpty()
  @IsString()
  usuario: string;

  @IsNotEmpty()
  @IsString()
  contrasena: string;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsOptional()
  @IsString()
  distrito: string;

  @IsOptional()
  @IsString()
  provincia: string;

  @IsNotEmpty()
  @IsString()
  dni: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsNumber()
  rol_id: number;
}
export class UsuarioUpdateDTO{
  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  apellido: string;

  @IsOptional()
  @IsNumber()
  edad: number;

  @IsOptional()
  @IsString()
  correo: string;

  @IsOptional()
  @IsString()
  usuario: string;

  @IsOptional()
  @IsString()
  contrasena: string;

  @IsOptional()
  @IsString()
  direccion: string;

  @IsOptional()
  @IsString()
  distrito: string;

  @IsOptional()
  @IsString()
  provincia: string;

  @IsOptional()
  @IsString()
  dni: string;

  @IsOptional()
  @IsString()
  telefono: string;

  @IsOptional()
  @IsNumber()
  rol_id: number;
}