import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean, IsArray } from 'class-validator';

export class TipoResiduoDTO
{
  @ApiProperty()
  @IsOptional()
  @IsString()
  codigo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tipo: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nivelPeligro: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  metodoAlmacenamiento: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  disposicionFinal: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  responsable: string;

  @ApiProperty()
  @IsArray()
  unidadesMedida: number[];
}

export class TipoResiduoUpdateDTO{
  @ApiProperty()
  @IsOptional()
  @IsString()
  codigo: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nivelPeligro: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  metodoAlmacenamiento: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tratamiento: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  disposicionFinal: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  responsale: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  unidadesMedida: number[];
}

export class TipoResiduoSeedDTO
{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tipo: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;
}