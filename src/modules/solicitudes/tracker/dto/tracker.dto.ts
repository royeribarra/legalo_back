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
  @IsOptional()
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
  @ApiProperty()
  @IsOptional()
  @IsString()
  codigo: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  etapaActual: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fechaInicio: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  fechaCompletado: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  estado: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  archivo: string;
}