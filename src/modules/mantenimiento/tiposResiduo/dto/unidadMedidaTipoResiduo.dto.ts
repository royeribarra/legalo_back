import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UnidadMedidaTipoResiduoDTO{
  @IsNotEmpty()
  @IsString()
  unidadMedida: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

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