import { IAbogado } from "./Abogado.interface";
import { IOferta } from "./Oferta.interface";

export interface IInvitacion {
    abogado: IAbogado;
    oferta: IOferta;
}