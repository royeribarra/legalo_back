import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class ClienteDTO{
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  contactoPrincipal: string;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsString()
  numeroContacto: string;

  @IsNotEmpty()
  @IsString()
  codigo: string;
}

export class ClienteUpdateDTO{
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