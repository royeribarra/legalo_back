export interface IConductor{
	nombre: string,
	apellido: string,
	edad: number,
	correo: string,
	usuario: string,
	contrasena: string,
	direccion: string,
	dni: string,
	telefono: string,
	licenciaConducir: string,
  fechaVencimientoLicencia: string,
  fechaContratacion: string,
  isActive: boolean,
  historialAccidentes: string,
  vehiculoAsignado: number,
  disponibilidad: number
}