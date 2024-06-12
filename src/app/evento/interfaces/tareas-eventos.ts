export interface TareasEvento {
  id:          number;
  titulo:      string;
  descripcion: string;
  fechaLimite: Date;
  etiqueta:    Etiqueta;
  prioridad:   Etiqueta;
  subtareas:   Subtarea[];

  active?: true,
  disabled?: false,
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
