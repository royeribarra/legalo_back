import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class TrackerDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  etapaActual: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fechaInicio: string;

  @ApiProperty()
  @IsString()
  fechaCompletado: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  estado: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  archivo: string;
}

export class TrackerUpdateDTO{
  @IsOptional()
  @IsString()
  etapaActual: string;

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