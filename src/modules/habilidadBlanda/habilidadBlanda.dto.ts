import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class HabilidadBlandaDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;
}