import { IAplicacion } from "./Aplicacion.interface";
import { IOferta } from "./Oferta.interface";
import { ITrabajo } from "./Trabajo.interface";
import { IUsuario } from "./Usuario.interface";

export interface ICliente{
    usuario: IUsuario;

    nombres: string;
    apellidos: string;
    correo: string;
    tipo_persona: string;
    razon_social: string;
    telefono_contacto: string;
    opinion: string;

    ofertas: IOferta[];
    trabajos: ITrabajo[];
}