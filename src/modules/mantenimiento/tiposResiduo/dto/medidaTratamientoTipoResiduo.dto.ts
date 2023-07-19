import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class MetodoTratamientoTipoResiduoDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  valor: number;
}
export class MetodoTratamientoTipoResiduoUpdateDTO
{
  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsNumber()
  valor: number;

  @IsOptional()
  @IsString()
  descripcion: number;
}