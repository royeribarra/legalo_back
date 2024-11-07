import { IAplicacion } from "./Aplicacion.interface";
import { IEducacion } from "./Educacion.interface";
import { IEspecialidad } from "./Especialidad.interface";
import { IExperiencia } from "./Experiencia.interface";
import { IHabilidaBlanda } from "./HabilidadBlanda.interface";
import { IHabilidadDura } from "./HabilidadDura.interface";
import { IIndutria } from "./Industria.interface";
import { IServicio } from "./Servicio.interface";
import { ITrabajo } from "./Trabajo.interface";
import { IUsuario } from "./Usuario.interface";

export interface IAbogado {
    usuario: IUsuario;
    nombres: string;
    apellidos: string;
    direccion: string;
    correo: string;
    contrasena: string;

    sobre_ti: string;
    grado_academico: string;

    video_url: string;
    foto_url: string;
    pdf_url: string;
    cul_url: string;

    habilidadesBlandas: IHabilidaBlanda[];
    habilidadesDuras: IHabilidadDura[];
    industrias: IIndutria[];
    servicios: IServicio[];
    experiencias: IExperiencia[];
    educaciones: IEducacion[];
    especialidades: IEspecialidad[];
    
    aplicaciones: IAplicacion[];
    trabajos: ITrabajo[];
}