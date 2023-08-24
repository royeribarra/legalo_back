import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResiduoRecojoDTO
{
  @ApiProperty()
  @IsOptional()
  @IsString()
  tipoResiduo: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cantidad: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  unidadMedida: string;
}

export class ResiduoRecojoUpdateDTO{
  @ApiProperty()
  @IsOptional()
  @IsString()
  nombre: string;
}