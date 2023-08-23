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
}

export class VehiculoUpdateDTO{
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