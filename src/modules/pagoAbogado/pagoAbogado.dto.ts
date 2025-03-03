import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean, IsEmail, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { EspecialidadDTO } from '../especialidad/especialidad.dto';
import { PreguntaDTO } from '../preguntas_oferta/preguntasOferta.dto';
import { ServicioDTO } from '../servicio/servicio.dto';

export class PagoAbogadoDTO {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  abogadoId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  trabajoId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  operacion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  monto: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  tipoPago: string;
}