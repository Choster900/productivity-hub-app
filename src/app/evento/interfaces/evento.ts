export interface Evento {
  id?:          number;
  titulo:      string;
  descripcion: string;
  fechaInicio: Date,
  fechaFin: Date,
  idTipoEvento?: number;
  tipoEvento?:  TipoEvento;
}

export interface TipoEvento {
  id:     number;
  nombre: string;
  icono:  string;
}
