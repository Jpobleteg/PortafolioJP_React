import Introduccion from '../src/components/Introduccion';
import { buscar, montar, type Vista } from './helpers';

describe('Componente Introduccion', () => {
  const props = {
    nombre: 'Javiera Poblete',
    titulo: 'Desarrolladora Fullstack',
    foto: 'img/perfil.svg',
    biografia: 'Me gusta crear aplicaciones web.',
  };
  let vista: Vista;

  beforeEach(() => {
    vista = montar(<Introduccion {...props} />);
  });

  afterEach(() => vista.desmontar());

  it('renderiza el nombre en un encabezado h1', () => {
    expect(buscar(vista.contenedor, 'h1').textContent).toBe('Javiera Poblete');
  });

  it('muestra la foto con un texto alternativo accesible', () => {
    const imagen = buscar<HTMLImageElement>(vista.contenedor, 'img');
    expect(imagen.getAttribute('src')).toBe('img/perfil.svg');
    expect(imagen.getAttribute('alt')).toBe('Foto profesional de Javiera Poblete');
  });

  it('muestra el título y la biografía recibidos por props', () => {
    expect(vista.contenedor.textContent).toContain('Desarrolladora Fullstack');
    expect(buscar(vista.contenedor, '.biografia').textContent).toBe(props.biografia);
  });

  it('incluye botones que llevan a proyectos y contacto', () => {
    const hrefs = [...vista.contenedor.querySelectorAll('a.btn')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['#proyectos', '#contacto']);
  });
});
