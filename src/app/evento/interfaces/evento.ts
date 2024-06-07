export interface Evento {
  id:          number;
  titulo:      string;
  descripcion: string;
  fecha:       Date;
  tipoEvento:  TipoEvento;
}

export interface TipoEvento {
  id:     number;
  nombre: string;
  icono:  string;
}
