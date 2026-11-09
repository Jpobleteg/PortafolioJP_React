 export interface Redes {
  github?: string;
  linkedin?: string;
  correo?: string;
}

export interface Perfil {
  nombre: string;
  titulo: string;
  foto: string;
  biografia: string;
  sobreMi: string;
  habilidades: string[];
  redes: Redes;
}

export interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  tecnologias: string[];
  enlace: string;
}

export interface NoticiaDatos {
  id: number;
  titulo: string;
  fecha: string; 
  contenido: string;
}

export interface Enlace {
  id: string;
  texto: string;
}

export interface DatosContacto {
  nombre: string;
  correo: string;
  mensaje: string;
}


export type Cargador = <T>(ruta: string) => Promise<T>;
