import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class AreaEmpresaDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsString()
  responsable: string;
}

export class AreaEmpresaUpdateDTO{
  @ApiProperty()
  @IsOptional()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  responsable: string;
}