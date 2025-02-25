import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PreguntaDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;
}

export class PreguntaUpdateDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    pregunta: string;
}