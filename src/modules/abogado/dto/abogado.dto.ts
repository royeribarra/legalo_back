import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean, IsEmail, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { HabilidadBlandaDTO } from '../../habilidadBlanda/habilidadBlanda.dto';
import { HabilidadDuraDTO } from '../../habilidadDura/habilidadDura.dto';
import { IndustriaDTO } from '../../industria/industria.dto';
import { ServicioDTO } from '../../servicio/servicio.dto';
import { ExperienciaDTO } from '../../experiencia/experiencia.dto';
import { EducacionDTO } from '../../educacion/educacion.dto';
import { EspecialidadDTO } from '../../especialidad/especialidad.dto';

export class AbogadoDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  apellidos: string;

  @ApiProperty()
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @IsNotEmpty()
  correo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contrasena: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dni: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  telefono: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  direccion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sobre_ti: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  grado_academico: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cip: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  colegio: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  video: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  foto: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cv: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cul: string;

  @ApiProperty({ type: () => [HabilidadBlandaDTO] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => HabilidadBlandaDTO)
  habilidadesBlandas: HabilidadBlandaDTO[];

  @ApiProperty({ type: () => [HabilidadDuraDTO] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => HabilidadDuraDTO)
  habilidadesDuras: HabilidadDuraDTO[];

  @ApiProperty({ type: () => [IndustriaDTO] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => IndustriaDTO)
  industrias: IndustriaDTO[];

  @ApiProperty({ type: () => [ServicioDTO] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ServicioDTO)
  servicios: ServicioDTO[];

  @ApiProperty({ type: () => [ExperienciaDTO] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ExperienciaDTO)
  experiencias: ExperienciaDTO[];

  @ApiProperty({ type: () => [EducacionDTO] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EducacionDTO)
  educaciones: EducacionDTO[];

  @ApiProperty({ type: () => [EspecialidadDTO] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => EspecialidadDTO)
  especialidades: EspecialidadDTO[];
}