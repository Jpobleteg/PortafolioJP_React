
export async function cargarJSON(ruta) {
  const respuesta = await fetch(ruta);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${ruta} (estado ${respuesta.status})`);
  }
  return respuesta.json();
}


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

export function ordenarPorFecha(noticias) {
  return [...noticias].sort((a, b) => b.fecha.localeCompare(a.fecha));
}
