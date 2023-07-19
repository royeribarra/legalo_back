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
  @IsString()
  distrito: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  provincia: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contacto: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  numeroContacto: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  codigoSucursal: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  latitud: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  longitud: string;

  @ApiProperty()
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