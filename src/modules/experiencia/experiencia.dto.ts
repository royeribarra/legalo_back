import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ExperienciaDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fecha_fin: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fecha_inicio: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    institucion: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion: string;
}