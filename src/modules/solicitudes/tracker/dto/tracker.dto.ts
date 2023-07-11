import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class TrackerDTO{
  @IsNotEmpty()
  @IsNumber()
  etapaActual: number;

  @IsNotEmpty()
  @IsString()
  fechaInicio: string;

  @IsString()
  fechaCompletado: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  estado: string;

  @IsOptional()
  @IsString()
  archivo: string;
}

export class TrackerUpdateDTO{
  @IsOptional()
  @IsNumber()
  etapaActual: number;

  @IsOptional()
  @IsString()
  fechaInicio: string;

  @IsOptional()
  @IsString()
  fechaCompletado: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  estado: string;

  @IsOptional()
  @IsString()
  archivo: string;
}