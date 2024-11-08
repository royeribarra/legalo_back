import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class IndustriaDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;
}