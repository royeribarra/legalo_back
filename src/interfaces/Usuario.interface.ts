import { IProfile } from "./Perfil.interface";

export interface IUsuario {
    usuario: string;
    contrasena: string;
    correo: string;
    perfil: IProfile;
}