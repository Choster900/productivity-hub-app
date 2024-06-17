export interface Tarea {
  id:          number;
  titulo:      string;
  descripcion: string;
  fechaLimite: Date;
  etiqueta:    Etiqueta;
  prioridad:   Etiqueta;
  subtareas:   Subtarea[];
}

export interface Etiqueta {
  id:     number;
  nombre: string;
  color:  string;
}

export interface Subtarea {
  id:     number;
  titulo: string;
  estado: boolean;
}
