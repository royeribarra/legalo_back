import { IAbogado } from "./Abogado.interface";
import { ICliente } from "./Cliente.interface";
import { IOferta } from "./Oferta.interface";

export interface IAplicacion {
    fecha_aplicacion: string;
    oferta: IOferta;
    abogado: IAbogado;
    status: number;
}