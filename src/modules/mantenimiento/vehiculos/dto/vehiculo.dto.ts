import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { TipoVehiculoEntity } from '../entities/tipoVehiculo.entity';

export class VehiculoDTO{
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsString()
  placa: string;

  tipoVehiculo: TipoVehiculoEntity;

  @IsNotEmpty()
  @IsNumber()
  capacidadCarga: number;

  @IsNotEmpty()
  @IsString()
  licencia: string;

  @IsNotEmpty()
  @IsString()
  estadoMantenimiento: string;

  @IsNotEmpty()
  @IsString()
  disponiblidad: string;

  @IsNotEmpty()
  @IsString()
  responsable: string;

  @IsNotEmpty()
  @IsString()
  vencimientoMTC: string;

  @IsNotEmpty()
  @IsString()
  vencimientoPoliza: string;

  @IsNotEmpty()
  @IsString()
  vencimientoRD: string;

  @IsNotEmpty()
  @IsString()
  vencimientoSOAT: string;
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