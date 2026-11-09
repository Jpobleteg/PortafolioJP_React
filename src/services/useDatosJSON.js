import { useEffect, useState } from 'react';
import { cargarJSON } from './datosService';


export function useDatosJSON(ruta, cargador = cargarJSON) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true; 
    setCargando(true);
    setError(null);

    cargador(ruta)
      .then((resultado) => {
        if (activo) setDatos(resultado);
      })
      .catch((err) => {
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
