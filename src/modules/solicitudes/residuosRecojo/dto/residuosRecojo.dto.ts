import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResiduoRecojoDTO
{
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  tipoResiduoId: number;

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