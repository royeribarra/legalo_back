import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class ConductorDTO{
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsNumber()
  tarifa: number;
}

export class ConductorUpdateDTO{
  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  codigo: string;

  @IsOptional()
  @IsNumber()
  tarifa: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}