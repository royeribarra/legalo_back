// src/trabajos/dto/crear-trabajo.dto.ts
import { IsInt, IsDateString, IsOptional, IsNumber, Min, Max } from 'class-validator';

export class CrearTrabajoDTO {
  @IsInt()
  estado: number;  // El estado del trabajo (pendiente, en progreso, completado, etc.)

  @IsDateString()
  fecha_inicio: string;  // Fecha de inicio del trabajo

  @IsDateString()
  fecha_fin: string;  // Fecha de finalización del trabajo
}

export class ActualizarProgresoDTO {
  @IsOptional()
  @IsInt()
  estado?: number;  // Nuevo estado del trabajo (0: Pendiente, 1: En progreso, 2: Completado)

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progreso?: number;  // Porcentaje de progreso (0-100)
}