import { cargarJSON, formatearFecha, ordenarPorFecha } from '../src/services/datosService';

describe('Servicio de datos (datosService)', () => {
  describe('cargarJSON', () => {
    it('devuelve el contenido del JSON cuando la respuesta es correcta (fetch simulado)', async () => {
      const datosFalsos = [{ id: 1, titulo: 'Prueba' }];
      // MOCK: reemplazamos fetch para no depender de la red ni de archivos reales
      spyOn(window, 'fetch').and.returnValue(
        Promise.resolve(new Response(JSON.stringify(datosFalsos), { status: 200 }))
      );

      const resultado = await cargarJSON('data/proyectos.json');

      expect(window.fetch).toHaveBeenCalledOnceWith('data/proyectos.json');
      expect(resultado).toEqual(datosFalsos);
    });

    it('lanza un error descriptivo cuando el archivo no existe (404)', async () => {
      spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response('', { status: 404 })));

      await expectAsync(cargarJSON('data/no-existe.json')).toBeRejectedWithError(
        'No se pudo cargar data/no-existe.json (estado 404)'
      );
    });
  });

  describe('formatearFecha', () => {
    it('convierte una fecha ISO al formato largo en español', () => {
      expect(formatearFecha('2026-11-04')).toBe('4 de noviembre de 2026');
    });

    it('devuelve un texto por defecto si la fecha no es válida', () => {
      expect(formatearFecha('no-es-fecha')).toBe('Fecha no disponible');
    });
  });

  describe('ordenarPorFecha', () => {
    it('ordena de la más reciente a la más antigua sin modificar el arreglo original', () => {
      const original = [
        { id: 1, fecha: '2026-01-10' },
        { id: 2, fecha: '2026-05-01' },
        { id: 3, fecha: '2025-12-31' },
      ];
      const copia = [...original];

      const ordenado = ordenarPorFecha(original);

      expect(ordenado.map((n) => n.id)).toEqual([2, 1, 3]);
      expect(original).toEqual(copia);
    });
  });
});
