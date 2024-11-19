import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SalarioDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    salario_minimo: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    salario_maximo: string;
}