import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PreguntaDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;
}