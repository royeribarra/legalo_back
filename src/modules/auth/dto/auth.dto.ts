import { IsNotEmpty, IsString } from "class-validator";
import { AuthBody } from "../interfaces/auth.interface";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDTO implements AuthBody{
  @ApiProperty()
  @IsNotEmpty()
  correo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contrasena: string;
}