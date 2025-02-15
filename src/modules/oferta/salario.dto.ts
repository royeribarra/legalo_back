import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class SalarioDTO {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    salario_minimo: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    salario_maximo: number;
}