//estados, pendiente, aprobado, rechazado
//completado, en progreso, pendiente

export interface IEtapaTracker{
  nombre: string,
  descripcion: string,
  estado: string,
  fechaInicio: string,
  fechaFinalizacion: string,
  responsable: string
}