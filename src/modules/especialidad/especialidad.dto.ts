import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class EspecialidadDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;
}