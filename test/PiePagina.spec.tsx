import PiePagina from '../src/components/PiePagina';
import { montar } from './helpers';

describe('Componente PiePagina', () => {
  it('muestra el año actual y los enlaces de redes entregados', () => {
    const vista = montar(
      <PiePagina nombre="Javiera" redes={{ github: 'https://github.com/x', linkedin: 'https://linkedin.com/in/x' }} />
    );

    expect(vista.contenedor.textContent).toContain(`© ${new Date().getFullYear()} Javiera`);
    expect(vista.contenedor.querySelectorAll('nav a').length).toBe(2);

    vista.desmontar();
  });

  it('no muestra enlaces si no se entregan redes', () => {
    const vista = montar(<PiePagina nombre="Javiera" />);
    expect(vista.contenedor.querySelectorAll('nav a').length).toBe(0);
    vista.desmontar();
  });
});
