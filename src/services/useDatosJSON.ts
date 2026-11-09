import { useEffect, useState } from 'react';
import { cargarJSON } from './datosService';
import type { Cargador } from '../types';

export interface EstadoDatos<T> {
  datos: T | null;
  cargando: boolean;
  error: string | null;
}


export function useDatosJSON<T>(ruta: string, cargador: Cargador = cargarJSON): EstadoDatos<T> {
  const [datos, setDatos] = useState<T | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true; 
    setCargando(true);
    setError(null);

    cargador<T>(ruta)
      .then((resultado) => {
        if (activo) setDatos(resultado);
      })
      .catch((err: Error) => {
        if (activo) setError(err.message);
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, [ruta, cargador]);

  return { datos, cargando, error };
}
