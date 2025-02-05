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
  @IsOptional()
  @IsNumber()
  trabajoId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  aplicacionId: number;

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
  direccionFactura: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nombreFactura: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ruc: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tipoComprobante: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tipoPago: string;
}