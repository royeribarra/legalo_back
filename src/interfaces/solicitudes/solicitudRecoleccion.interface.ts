export interface ISolicitudRecoleccion{
  codigo: number,
  fechaSolicitud: string,
  empresaSolicitante: number,
  sucursalEmpresaSolicitante: number,
  tipoResiduo: number,
  cantidad: number,
  fechaRecoleccion: string,
  direccionRecoleccion: string,
  contactoEmpresa: string,
  estadoSolicitud: number
}