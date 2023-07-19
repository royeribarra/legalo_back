import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class ResiduoDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  nivelPeligro: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cantidadGenerada: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tratamiento: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  disposicionFinal: string;

  @ApiProperty()
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