/* eslint-disable prettier/prettier */
export interface IConductor {
  tipo: number;
  nombre: string;
  apellido: string;
  correo: string;
  direccion: string;
  dni: string;
  telefono: string;
  licenciaConducir: string;
  fechaVencimientoLicencia: string;
  fechaContratacion: string;
  isActive: boolean;
  disponibilidad: string;
}
