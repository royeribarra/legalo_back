import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class RolDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descripcion: string;
}

export class RolUpdateDTO{
  @ApiProperty()
  @IsOptional()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  descripcion: string;
}