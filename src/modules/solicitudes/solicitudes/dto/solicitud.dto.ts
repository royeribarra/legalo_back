import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { TrackerEntity } from '../../tracker/entities/tracker.entity';

export class SolicitudDTO{
  @IsNotEmpty()
  @IsString()
  fechaRecoleccion: string;

  @IsNotEmpty()
  @IsString()
  fechaSolicitud: string;

  @IsNotEmpty()
  @IsNumber()
  empresaSolicitante: number;

  @IsNotEmpty()
  @IsNumber()
  sucursalEmpresaSolicitante: number;

  @IsNotEmpty()
  @IsNumber()
  tipoResiduo: number;

  @IsNotEmpty()
  @IsNumber()
  unidadMedida: number;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsNotEmpty()
  @IsNumber()
  cilindros: number;

  @IsNotEmpty()
  @IsString()
  direccionRecoleccion: string;

  @IsString()
  contactoEmpresa: string;

  @IsNotEmpty()
  @IsNumber()
  estadoSolicitud: number;

  @IsString()
  observacion: string;

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