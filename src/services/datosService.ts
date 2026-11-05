/**
 * Servicio de datos: lee archivos JSON ubicados en /public/data.
 * Se separa en un módulo propio para poder simularlo (mock) en las pruebas.
 */

/**
 * Descarga y convierte un archivo JSON.
 * @param ruta Ruta relativa del archivo, por ejemplo "data/proyectos.json".
 * @returns Contenido del JSON ya convertido al tipo T.
 */
export async function cargarJSON<T>(ruta: string): Promise<T> {
  const respuesta = await fetch(ruta);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${ruta} (estado ${respuesta.status})`);
  }
  return (await respuesta.json()) as T;
}

/**
 * Formatea una fecha ISO (AAAA-MM-DD) al formato chileno: "4 de noviembre de 2026".
 */
export function formatearFecha(fechaISO: string): string {
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
 */
export function ordenarPorFecha<T extends { fecha: string }>(noticias: T[]): T[] {
  return [...noticias].sort((a, b) => b.fecha.localeCompare(a.fecha));
}
