export interface IVehiculo{
  codigo: number,
  placa: string,
  tipoVehiculo: number,
  capacidadCarga: number,
  certificado: string,
  licencia: string,
  estadoMantenimiento: number,
  disponibilidad: boolean,
  responsable: string,
  vencimientoMTC: string,
  vencimientoSOAT: string,
  vencimientoRD: string,
  vencimientoPoliza: string
}