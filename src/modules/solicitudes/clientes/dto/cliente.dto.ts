import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class ClienteDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ruc: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contactoPrincipal: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  direccion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  numeroContacto: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsOptional()
  @IsNumber()
  provinciaId: number;

  @IsOptional()
  @IsNumber()
  distritoId: number;
}

export class ClienteUpdateDTO{
  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  codigo: string;

  @IsOptional()
  @IsNumber()
  tarifa: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}