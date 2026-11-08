/**
 * Servicio de datos: lee archivos JSON ubicados en /public/data.
 * Se separa en un módulo propio para poder simularlo (mock) en las pruebas.
 */

/**
 * Descarga y convierte un archivo JSON.
 * @param {string} ruta Ruta relativa del archivo, por ejemplo "data/proyectos.json".
 * @returns {Promise<any>} Contenido del JSON ya convertido a objeto/arreglo.
 */
export async function cargarJSON(ruta) {
  const respuesta = await fetch(ruta);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${ruta} (estado ${respuesta.status})`);
  }
  return respuesta.json();
}

/**
 * Formatea una fecha ISO (AAAA-MM-DD) al formato chileno: "4 de noviembre de 2026".
 * @param {string} fechaISO
 * @returns {string}
 */
export function formatearFecha(fechaISO) {
  const fecha = new Date(`${fechaISO}T00:00:00Z`);
  if (Number.isNaN(fecha.getTime())) return 'Fecha no disponible';
  return fecha.toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Ordena noticias de la más reciente a la más antigua sin modificar el arreglo original.
 * @param {Array<{fecha: string}>} noticias
 */
export function ordenarPorFecha(noticias) {
  return [...noticias].sort((a, b) => b.fecha.localeCompare(a.fecha));
}
