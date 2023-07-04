import { IsNumber, IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class SucursalClienteDTO{
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsString()
  distrito: string;

  @IsNotEmpty()
  @IsString()
  provincia: string;

  @IsNotEmpty()
  @IsString()
  contacto: string;

  @IsNotEmpty()
  @IsString()
  numeroContacto: string;

  @IsNotEmpty()
  @IsString()
  codigoSucursal: string;

  @IsNotEmpty()
  @IsString()
  latitud: string;

  @IsNotEmpty()
  @IsString()
  longitud: string;

  @IsNotEmpty()
  @IsNumber()
  clienteId: number;
}

export class SucursalClienteUpdateDTO{
  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  direccion: string;

  @IsOptional()
  @IsString()
  contacto: string;

  @IsOptional()
  @IsString()
  codigoSucursal: string;
}