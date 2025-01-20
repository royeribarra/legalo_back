import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean, IsEmail, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClienteDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @ApiProperty()
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @IsNotEmpty()
  correo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  documento: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tipoPersona: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  telefono: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  empresa: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  opinion: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contrasena: string;
}

export class ClienteSeederDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @ApiProperty()
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @IsNotEmpty()
  correo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  documento: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tipo_persona: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  telefono_contacto: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  empresa: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  opinion: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contrasena: string;
}

export class ClienteUpdateDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  nombres: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  apellidos: string;

  @ApiProperty()
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @IsOptional()
  correo: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  documento: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tipoPersona: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  telefono: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  empresa: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  opinion: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contrasena: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  validad_admin: boolean;
}