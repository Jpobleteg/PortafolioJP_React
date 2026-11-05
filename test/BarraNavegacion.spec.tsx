import BarraNavegacion from '../src/components/BarraNavegacion';
import { ENLACES } from '../src/App';
import { buscar, clic, montar, type Vista } from './helpers';

describe('Componente BarraNavegacion', () => {
  let vista: Vista;

  beforeEach(() => {
    vista = montar(<BarraNavegacion nombre="Javiera Poblete" enlaces={ENLACES} />);
  });

  afterEach(() => vista.desmontar());

  it('muestra el nombre como marca de la barra', () => {
    expect(buscar(vista.contenedor, '.navbar-brand').textContent).toBe('Javiera Poblete');
  });

  it('crea un enlace por cada sección recibida en props', () => {
    const enlaces = vista.contenedor.querySelectorAll('.nav-link');
    expect(enlaces.length).toBe(ENLACES.length);
    expect(enlaces[2].getAttribute('href')).toBe('#proyectos');
    expect(enlaces[2].textContent).toBe('Proyectos');
  });

  it('abre el menú colapsable al hacer clic en el botón (evento + DOM)', () => {
    const boton = buscar(vista.contenedor, '.navbar-toggler');
    expect(boton.getAttribute('aria-label')).toBe('Abrir menú de navegación');
    expect(boton.classList).toContain('collapsed');

    clic(boton);

    expect(boton.classList).not.toContain('collapsed');
  });
});
