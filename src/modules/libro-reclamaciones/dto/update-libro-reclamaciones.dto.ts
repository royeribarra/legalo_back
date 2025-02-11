import { PartialType } from "@nestjs/mapped-types";
import { CreateLibroReclamacionesDto } from "./create-libro-reclamaciones.dto";

export class UpdateLibroReclamacionesDto extends PartialType(CreateLibroReclamacionesDto) {}
