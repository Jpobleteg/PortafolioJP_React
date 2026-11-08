import { useEffect, useState } from 'react';
import { cargarJSON } from './datosService';

/**
 * Hook personalizado que carga un JSON y guarda el resultado en el estado (state).
 * Devuelve { datos, cargando, error } para que el componente decida qué mostrar.
 * @param {string} ruta Ruta del archivo JSON.
 * @param {Function} cargador Función que carga los datos (se puede reemplazar en pruebas).
 */
export function useDatosJSON(ruta, cargador = cargarJSON) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true; // evita actualizar el estado si el componente se desmonta
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
