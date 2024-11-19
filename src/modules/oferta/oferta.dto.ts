import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean, IsEmail, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { EspecialidadDTO } from '../especialidad/especialidad.dto';
import { PreguntaDTO } from '../preguntas_oferta/preguntasOferta.dto';
import { ServicioDTO } from '../servicio/servicio.dto';
import { SalarioDTO } from './salario.dto';

export class OfertaDTO {
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
  presupuesto: SalarioDTO;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  uso: string;

  @ApiProperty({ type: () => [ServicioDTO] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ServicioDTO)
  servicios: ServicioDTO[];

  @ApiProperty({ type: () => [EspecialidadDTO] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EspecialidadDTO)
  especialidades: EspecialidadDTO[];

  @ApiProperty({ type: () => [PreguntaDTO] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PreguntaDTO)
  preguntas: PreguntaDTO[];
}