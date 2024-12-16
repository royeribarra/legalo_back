import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean, IsEmail, ValidateNested, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { EspecialidadDTO } from '../especialidad/especialidad.dto';
import { PreguntaDTO } from '../preguntas_oferta/preguntasOferta.dto';
import { ServicioDTO } from '../servicio/servicio.dto';
import { SalarioDTO } from './salario.dto';

export class OfertaDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  clienteId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  duracion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nivelExperiencia: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SalarioDTO)
  presupuesto: SalarioDTO;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  uso: string;

  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  servicios: number[];

  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  especialidades: number[];

  @ApiProperty({ type: () => [PreguntaDTO] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PreguntaDTO)
  preguntas: PreguntaDTO[];
}