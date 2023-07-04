export interface IVehiculo{
  codigo: number,
  descripcion: string,
  equipamientoEspecializado: [
    'sistemas de contención',
    'sistemas de monitoreo',
    'equipos de emergencia'
  ],
  requisitosSeguridad: [
    'regulaciones relacionadas con el transporte de materiales peligrosos',
    'señalización de advertencia',
    'sistemas de mitigación de riesgos'
  ],
  requisitosMantenimiento: [
    'frecuencia de inspección',
    'verificación de equipos de seguridad',
    'mantenimiento preventivo',

  ],
  capacidadCarga: number,
  certificaciones: [
    'certificados de formación'
  ],
  licencias: [
    'licencias de conducir específicas',
  ],
  estadoMantenimiento: number,
  disponibilidad: boolean,
  responsable: string,
}