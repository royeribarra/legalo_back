import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean, IsEmail, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { EspecialidadDTO } from '../especialidad/especialidad.dto';
import { PreguntaDTO } from '../preguntas_oferta/preguntasOferta.dto';
import { ServicioDTO } from '../servicio/servicio.dto';

export class PagoDTO {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  clienteId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  abogadoId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  ofertaId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  operacion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  monto: number;
}