import { IAplicacion } from "./Aplicacion.interface";
import { ICliente } from "./Cliente.interface";
import { IEspecialidad } from "./Especialidad.interface";
import { IPreguntaOferta } from "./PreguntaOferta.interface";
import { IServicio } from "./Servicio.interface";

export interface IOferta {
    titulo: string;
    descripcion: string;
    documento_url: string;
    duracion: string;
    experiencia_abogado: string;
    salario: string;

    servicios: IServicio[];
    especialidades: IEspecialidad[];
    preguntas_oferta: IPreguntaOferta[];

    cliente: ICliente;
    estado: string;
    aplicaciones: IAplicacion[];
}