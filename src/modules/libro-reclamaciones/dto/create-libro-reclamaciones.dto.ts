import { IsString, IsEmail, IsEnum, Length, MinLength } from "class-validator";
import { TipoReclamo } from "../libro-reclamaciones.entity";

export class CreateLibroReclamacionesDto {
  @IsString()
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres" })
  nombre: string;

  @IsString()
  @Length(8, 8, { message: "El DNI debe tener exactamente 8 dígitos" })
  dni: string;

  @IsEmail({}, { message: "Correo electrónico inválido" })
  email: string;

  @IsString()
  @Length(9, 9, { message: "El teléfono debe tener exactamente 9 dígitos" })
  telefono: string;

  @IsEnum(TipoReclamo, { message: "Tipo debe ser Reclamo o Queja" })
  tipo: TipoReclamo;

  @IsString()
  @MinLength(10, { message: "Debe contener al menos 10 caracteres" })
  descripcion: string;
}
