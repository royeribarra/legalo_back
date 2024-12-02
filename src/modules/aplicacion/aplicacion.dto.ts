// src/aplicaciones/dto/aplicacion-create.dto.ts
import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';

export class AplicacionCreateDTO {
  @IsNotEmpty()
  fecha_aplicacion: string;  // Fecha de la aplicación

  @IsInt()
  status: number;  // Estado de la aplicación, puede ser 0 (pendiente), 1 (aprobada), 2 (rechazada)

  @IsInt()
  ofertaId: number;  // ID de la oferta a la que el abogado está postulando

  @IsInt()
  abogadoId: number;  // ID del abogado que está postulando
}
