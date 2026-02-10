import { IAbogado } from "./Abogado.interface";
import { ICliente } from "./Cliente.interface";
import { IOferta } from "./Oferta.interface";

export interface IAplicacion {
    fecha_aplicacion: Date;
    oferta: IOferta;
    abogado: IAbogado;
    estado: string;
}