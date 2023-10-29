import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class SucursalClienteDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  direccion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  distritoId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  provinciaId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contacto: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  numeroContacto: string;

  @ApiProperty()
  @IsString()
  codigoSucursal: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  latitud: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  longitud: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  observaciones: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  clienteId: number;
}

export class SucursalClienteUpdateDTO{
  @ApiProperty()
  @IsOptional()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  direccion: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  distritoId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  provinciaId: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contacto: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  numeroContacto: string;

  @ApiProperty()
  @IsOptional()
  codigoSucursal: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  latitud: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  longitud: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  observaciones: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  clienteId: number;
}