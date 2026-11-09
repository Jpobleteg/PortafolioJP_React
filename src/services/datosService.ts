
export async function cargarJSON<T>(ruta: string): Promise<T> {
  const respuesta = await fetch(ruta);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${ruta} (estado ${respuesta.status})`);
  }
  return (await respuesta.json()) as T;
}


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


export function ordenarPorFecha<T extends { fecha: string }>(noticias: T[]): T[] {
  return [...noticias].sort((a, b) => b.fecha.localeCompare(a.fecha));
}
