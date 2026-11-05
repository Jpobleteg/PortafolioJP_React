import ProyectoCard from '../src/components/ProyectoCard';
import { buscar, montar, type Vista } from './helpers';

describe('Componente ProyectoCard', () => {
  const proyecto = {
    titulo: 'Tienda Online',
    descripcion: 'Un e-commerce de prueba.',
    imagen: 'img/proyecto-tienda.svg',
    tecnologias: ['React', 'Bootstrap'],
    enlace: 'https://github.com/usuario/tienda',
  };
  let vista: Vista;

  beforeEach(() => {
    vista = montar(<ProyectoCard {...proyecto} />);
  });

  afterEach(() => vista.desmontar());

  it('se renderiza como una Card de Bootstrap con título y descripción', () => {
    expect(vista.contenedor.querySelector('.card')).not.toBeNull();
    expect(buscar(vista.contenedor, '.card-title').textContent).toBe('Tienda Online');
    expect(buscar(vista.contenedor, '.card-text').textContent).toBe('Un e-commerce de prueba.');
  });

  it('muestra la imagen con alt y carga diferida (lazy)', () => {
    const imagen = buscar<HTMLImageElement>(vista.contenedor, 'img');
    expect(imagen.getAttribute('alt')).toBe('Captura del proyecto Tienda Online');
    expect(imagen.getAttribute('loading')).toBe('lazy');
  });

  it('lista las tecnologías utilizadas', () => {
    const tecnologias = [...vista.contenedor.querySelectorAll('.lista-tecnologias li')].map(
      (li) => li.textContent
    );
    expect(tecnologias).toEqual(['React', 'Bootstrap']);
  });

  it('tiene un enlace seguro al repositorio que abre en otra pestaña', () => {
    const enlace = buscar(vista.contenedor, 'a.btn');
    expect(enlace.getAttribute('href')).toBe(proyecto.enlace);
    expect(enlace.getAttribute('target')).toBe('_blank');
    expect(enlace.getAttribute('rel')).toBe('noopener noreferrer');
  });
});
