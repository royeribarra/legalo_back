import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { TipoVehiculoEntity } from '../entities/tipoVehiculo.entity';
import { ApiProperty } from '@nestjs/swagger';

export class VehiculoDTO{
  // @IsNotEmpty()
  // @IsString()
  // codigo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  placa: string;

  @ApiProperty()
  @IsNumber()
  tipoVehiculo: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  capacidadCarga: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  unidadMedida: number;

  // @IsNotEmpty()
  // @IsString()
  // licencia: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  estadoMantenimiento: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  disponibilidad: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  responsable: string;

  // @IsNotEmpty()
  // @IsString()
  // vencimientoMTC: string;

  // @IsNotEmpty()
  // @IsString()
  // vencimientoPoliza: string;

  // @IsNotEmpty()
  // @IsString()
  // vencimientoRD: string;

  // @IsNotEmpty()
  // @IsString()
  // vencimientoSOAT: string;
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