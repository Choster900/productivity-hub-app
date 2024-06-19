export interface User {
  id?:            number;
  email:         string;
  password?:     string;
  persona:       Persona;
  configuracion?: Configuracion;
  token?:         string;
}

export interface Configuracion {
  id:                 number;
  tema:               string;
  notificacionCorreo: boolean;
}

export interface Persona {
  id?:              number;
  nombre:          string;
  apellido:        string;
  fechaNacimiento: Date;
}
