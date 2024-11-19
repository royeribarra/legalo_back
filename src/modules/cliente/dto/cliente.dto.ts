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