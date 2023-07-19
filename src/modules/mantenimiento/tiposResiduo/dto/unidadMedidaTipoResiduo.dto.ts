import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UnidadMedidaTipoResiduoDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  unidadMedida: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  factorConversion: string;
}
export class UnidadMedidaTipoResiduoUpdateDTO
{
  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  factorConversion: string;

  @IsOptional()
  @IsString()
  descripcion: string;
}