import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class TipoResiduoDTO
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nivelPeligro: string;

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
  @IsString()
  nivelPeligro: string;

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