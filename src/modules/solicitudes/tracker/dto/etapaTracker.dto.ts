import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class EtapaTrackerDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsString()
  estado: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fechaInicio: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fechaFinalizacion: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  responsable: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  trackerId: number;
}

export class EtapaTrackerUpdateDTO{
  
}