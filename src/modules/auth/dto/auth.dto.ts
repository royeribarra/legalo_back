import { IsNotEmpty, IsString } from "class-validator";
import { AuthBody } from "../interfaces/auth.interface";

export class AuthDTO implements AuthBody{
  @IsNotEmpty()
  usuario: string;

  @IsNotEmpty()
  @IsString()
  contrasena: string;
}