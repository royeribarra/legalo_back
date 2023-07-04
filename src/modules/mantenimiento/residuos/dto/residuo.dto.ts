import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class ResiduoDTO{
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  nivelPeligro: number;

  @IsNotEmpty()
  @IsNumber()
  cantidadGenerada: number;

  @IsNotEmpty()
  @IsString()
  tratamiento: string;

  @IsNotEmpty()
  @IsString()
  disposicionFinal: string;

  @IsNotEmpty()
  @IsString()
  responsable: string;
}
export class ResiduoUpdateDTO{
  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsNumber()
  nivelPeligro: number;

  @IsOptional()
  @IsNumber()
  cantidadGenerada: number;

  @IsOptional()
  @IsString()
  tratamiento: string;

  @IsOptional()
  @IsString()
  disposicionFinal: string;

  @IsOptional()
  @IsString()
  responsable: string;
}