import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

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
  @IsString()
  sucursalEmpresaSolicitante: string;

  @IsNotEmpty()
  @IsString()
  tipoResiduo: string;

  @IsNotEmpty()
  @IsString()
  cantidad: string;

  @IsNotEmpty()
  @IsString()
  cilindros: string;

  @IsNotEmpty()
  @IsString()
  direccionRecoleccion: string;

  @IsNotEmpty()
  @IsString()
  contactoEmpresa: string;

  @IsNotEmpty()
  @IsString()
  estadoSolicitud: string;

  @IsNotEmpty()
  @IsString()
  observacion: string;
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