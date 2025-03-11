import { IsNumber, IsOptional, IsNotEmpty, IsString, IsBoolean, IsEmail, ValidateNested, IsArray } from 'class-validator';
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
  @IsOptional()
  @IsString()
  ruc: string;

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
  objetivo: string;

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

  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  industrias: number[];

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
}

export class AbogadoUpdateDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  nombres: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  apellidos: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contrasena: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  telefono: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  direccion: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sobre_ti: string;

  @ApiProperty()
  @IsOptional()
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
  @IsBoolean()
  validad_admin: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  objetivo: string;

  @ApiProperty({ type: () => [HabilidadBlandaDTO] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => HabilidadBlandaDTO)
  habilidadesBlandas: HabilidadBlandaDTO[];

  @ApiProperty({ type: () => [HabilidadDuraDTO] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => HabilidadDuraDTO)
  habilidadesDuras: HabilidadDuraDTO[];

  @ApiProperty({ type: () => [IndustriaDTO] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => IndustriaDTO)
  industrias: IndustriaDTO[];

  @ApiProperty({ type: () => [ExperienciaDTO] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ExperienciaDTO)
  experiencias: ExperienciaDTO[];

  @ApiProperty({ type: () => [EducacionDTO] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EducacionDTO)
  educaciones: EducacionDTO[];

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  serviciosAbogado: number[];

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  especialidadesAbogado: number[];
}
