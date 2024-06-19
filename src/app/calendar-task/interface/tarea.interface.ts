export interface Tarea {
  id:          number;
  titulo:      string;
  descripcion: string;
  fechaLimite: Date;
  etiqueta:    Etiqueta;
  prioridad:   Etiqueta;
  subtareas:   Subtarea[];
  proyecto:    Proyecto | null;
  evento:      Evento | null;
}

export interface Etiqueta {
  id:     number;
  nombre: string;
  color:  string;
}

export interface Evento {
  id:          number;
  titulo:      string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin:    Date;
  tipoEvento:  TipoEvento;
}

export interface TipoEvento {
  id:     number;
  nombre: string;
  icono:  string;
}

export interface Proyecto {
  id:          number;
  nombre:      string;
  descripcion: string;
  estado:      boolean;
}

export interface Subtarea {
  id:     number;
  titulo: string;
  estado: boolean;
}
