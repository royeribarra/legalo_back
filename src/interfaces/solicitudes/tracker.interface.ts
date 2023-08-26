// ID del Tracker: Un identificador único para cada registro en la tabla "tracker".
// ID de la Solicitud: Un campo que relacione el registro del tracker con la solicitud correspondiente en la tabla "solicitud".
// Paso/etapa: Una columna para almacenar el nombre o identificador del paso o etapa completada en la solicitud.
// Fecha de completado: Una columna que registre la fecha y hora en que se completó el paso o etapa.
// Descripción: Un campo opcional para proporcionar detalles adicionales o comentarios sobre el paso completado.
// Estado: Una columna para indicar el estado actual del paso o etapa (por ejemplo, "completado", "en progreso", "pendiente", etc.).
// Responsable: Un campo para especificar la persona o departamento responsable de completar el paso o etapa.
// Archivos adjuntos: Si es relevante, puedes incluir una columna para almacenar enlaces o referencias a archivos adjuntos relacionados con el paso completado.

//todo tracker debe tener 4 pasos, asignado, en camino, recogido y entregado

export interface ITrackerSolicitud{
  codigo: string,
  etapaActual: string,
  fechaInicio: string,
  fechaCompletado: string,
  descripcion: string,
  estado: string,
  archivo: string
}