import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class HabilidadDuraDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;
}