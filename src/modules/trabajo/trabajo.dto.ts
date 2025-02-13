// src/trabajos/dto/crear-trabajo.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, IsOptional, IsNumber, Min, Max, IsString } from 'class-validator';

export class CrearTrabajoDTO {
  @IsOptional()
  @IsString()
  estado: string;  // El estado del trabajo (pendiente, en progreso, completado, etc.)

  @IsOptional()
  @IsDateString()
  fecha_inicio: string;  // Fecha de inicio del trabajo

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  fecha_fin: string;

  @IsOptional()
  @IsNumber()
  clienteId: number;

  @IsOptional()
  @IsNumber()
  abogadoId: number;

  @IsOptional()
  @IsNumber()
  aplicacionId: number;

  @IsOptional()
  @IsNumber()
  ofertaId: number;
}

export class ActualizarProgresoDTO {
  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsNumber()
  trabajoId?: number;// Nuevo estado del trabajo (0: Pendiente, 1: En progreso, 2: Completado)

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progreso?: number;  // Porcentaje de progreso (0-100)
}