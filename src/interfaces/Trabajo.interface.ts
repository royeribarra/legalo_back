import { IAbogado } from "./Abogado.interface";
import { IAplicacion } from "./Aplicacion.interface";
import { ICliente } from "./Cliente.interface";
import { IOferta } from "./Oferta.interface";

export interface ITrabajo {
    aplicacion: IAplicacion;
    fecha_inicio: string;
    fecha_fin: string;
    estado: number;
    
}