export interface TareasProyecto {
  id:             number;
  titulo:         string;
  descripcion:    string;
  fechaLimite:    Date;
  idProyecto?:    number;
  etiqueta:       Etiqueta;
  idPrioridad?:   number;
  prioridad:      Prioridad;
  subtareas:      Subtarea[];
  active?:        true,
  disabled?:      false,
}

export interface Etiqueta {
  id:     number;
  nombre: string;
  color:  string;
}

export interface Prioridad {
  id:     number;
  nombre: string;
  color:  string;
}

export interface Subtarea {
  id:     number;
  idTarea?:    number;
  titulo: string;
  estado: boolean;
}
