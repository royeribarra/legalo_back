import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class ConductorDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellido: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  correo: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  direccion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dni: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  telefono: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  licenciaConducir: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fechaContratacion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fechaVencimientoLicencia: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  vehiculoId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  disponibilidad: string;
}

export class ConductorUpdateDTO{
  @ApiProperty()
  @IsOptional()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  apellido: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  correo: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  direccion: string;

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
  @IsString()
  licenciaConducir: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fechaContratacion: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fechaVencimientoLicencia: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vehiculoId: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  disponibilidad: string;
}