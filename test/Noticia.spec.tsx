import Noticia from '../src/components/Noticia';
import { buscar, montar } from './helpers';

describe('Componente Noticia', () => {
  it('muestra título, fecha formateada y contenido', () => {
    const vista = montar(
      <Noticia titulo="Nueva versión" fecha="2026-10-15" contenido="Contenido breve." />
    );

    expect(buscar(vista.contenedor, '.card-title').textContent).toBe('Nueva versión');
    const fecha = buscar(vista.contenedor, 'time');
    expect(fecha.getAttribute('dateTime')).toBe('2026-10-15');
    expect(fecha.textContent).toBe('15 de octubre de 2026');
    expect(buscar(vista.contenedor, '.card-text').textContent).toBe('Contenido breve.');

    vista.desmontar();
  });
});
