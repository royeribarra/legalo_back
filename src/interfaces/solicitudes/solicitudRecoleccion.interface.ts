export interface ISolicitudRecoleccion{
  codigo: string,
  fechaSolicitud: string,
  empresaSolicitante: number,
  sucursalEmpresaSolicitante: number,
  tipoResiduo: number,
  cantidad: number,
  fechaRecoleccion: string,
  direccionRecoleccion: string,
  contactoEmpresa: string,
  estadoSolicitud: number,
  cilindros: number,
  observacion: string
}