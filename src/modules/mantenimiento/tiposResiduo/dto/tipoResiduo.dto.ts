import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class TipoResiduoDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  nivelPeligro: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  metodoAlmacenamiento: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  disposicionFinal: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  responsable: string;
}
export class TipoResiduoUpdateDTO{
  @IsOptional()
  @IsString()
  codigo: string;

  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsNumber()
  nivelPeligro: number;

  @IsOptional()
  @IsString()
  metodoAlmacenamiento: number;

  @IsOptional()
  @IsString()
  tratamiento: string;

  @IsOptional()
  @IsString()
  disposicionFinal: string;

  @IsOptional()
  @IsString()
  responsale: string;
}