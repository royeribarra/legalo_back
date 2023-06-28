import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class TipoResiduoDTO{
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsNumber()
  nivelPeligro: number;

  @IsNotEmpty()
  @IsString()
  metodoAlmacenamiento: number;

  @IsNotEmpty()
  @IsString()
  tratamiento: string;

  @IsNotEmpty()
  @IsString()
  disposicionFinal: string;

  @IsNotEmpty()
  @IsString()
  responsale: string;
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