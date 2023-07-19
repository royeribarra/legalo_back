import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { TrackerEntity } from '../../tracker/entities/tracker.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SolicitudDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fechaRecoleccion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fechaSolicitud: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  empresaSolicitante: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sucursalEmpresaSolicitante: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tipoResiduo: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  unidadMedida: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cilindros: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  direccionRecoleccion: string;

  @ApiProperty()
  @IsString()
  contactoEmpresa: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  estadoSolicitud: number;

  @ApiProperty()
  @IsString()
  observacion: string;

  @ApiProperty()
  @IsOptional()
  tracker: TrackerEntity;
}

export class SolicitudUpdateDTO{
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