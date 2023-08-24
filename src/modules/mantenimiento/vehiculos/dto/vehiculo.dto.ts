import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { TipoVehiculoEntity } from '../entities/tipoVehiculo.entity';
import { ApiProperty } from '@nestjs/swagger';

export class VehiculoDTO
{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  placa: string;

  @ApiProperty()
  @IsNumber()
  tipoVehiculoId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  capacidadCarga: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  unidadMedida: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  estadoMantenimiento: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  disponibilidad: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  responsable: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  codigo: string;
}

export class VehiculoUpdateDTO{
  @ApiProperty()
  @IsOptional()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  placa: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  tipoVehiculoId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  capacidadCarga: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  unidadMedida: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  estadoMantenimiento: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  disponibilidad: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  responsable: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  codigo: string;
}