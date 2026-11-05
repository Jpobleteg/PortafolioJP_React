import App from '../src/App';
import type { Cargador } from '../src/types';
import { buscar, esperar, montar, promesaPendiente, type Vista } from './helpers';

// Datos simulados (mocks) que reemplazan a los archivos JSON reales
const MOCK_DATOS: Record<string, unknown> = {
  'data/perfil.json': {
    nombre: 'Persona de Prueba',
    titulo: 'Dev',
    foto: 'img/perfil.svg',
    biografia: 'Bio',
    sobreMi: 'Sobre mí de prueba',
    habilidades: ['React'],
    redes: { github: 'https://github.com/p', correo: 'p@correo.cl' },
  },
  'data/proyectos.json': [
    { id: 1, titulo: 'P1', descripcion: 'd', imagen: 'img/proyecto-tienda.svg', tecnologias: ['React'], enlace: '#' },
    { id: 2, titulo: 'P2', descripcion: 'd', imagen: 'img/proyecto-tareas.svg', tecnologias: ['Java'], enlace: '#' },
    { id: 3, titulo: 'P3', descripcion: 'd', imagen: 'img/proyecto-api.svg', tecnologias: ['SQL'], enlace: '#' },
  ],
  'data/noticias-tecnologia.json': [{ id: 1, titulo: 'Tec 1', fecha: '2026-10-01', contenido: 'x' }],
  'data/noticias-personales.json': [{ id: 1, titulo: 'Personal 1', fecha: '2026-09-01', contenido: 'y' }],
};

const cargadorFalso: Cargador = <T,>(ruta: string) => Promise.resolve(MOCK_DATOS[ruta] as T);

describe('Componente App (integración)', () => {
  let vista: Vista;
  afterEach(() => vista.desmontar());

  it('muestra un mensaje de carga mientras llega el perfil', () => {
    const { promesa } = promesaPendiente();
    vista = montar(<App cargador={(() => promesa) as Cargador} />);
    expect(vista.contenedor.textContent).toContain('Cargando portafolio');
  });

  it('muestra un error si el perfil no se puede cargar', async () => {
    vista = montar(<App cargador={() => Promise.reject(new Error('sin conexión'))} />);
    await esperar();
    expect(buscar(vista.contenedor, '.alert-danger').textContent).toContain('sin conexión');
  });

  it('renderiza todas las secciones con los datos de los JSON', async () => {
    const cargador = jasmine.createSpy('cargador').and.callFake(cargadorFalso);
    vista = montar(<App cargador={cargador} />);
    await esperar();

    // Se pidieron los 4 archivos JSON
    expect(cargador.calls.allArgs().map((a) => a[0]).sort()).toEqual(Object.keys(MOCK_DATOS).sort());

    const c = vista.contenedor;
    expect(c.querySelector('.navbar')).not.toBeNull();
    ['inicio', 'sobre-mi', 'proyectos', 'noticias', 'contacto'].forEach((id) => {
      expect(c.querySelector(`#${id}`)).withContext(`sección #${id}`).not.toBeNull();
    });
    expect(buscar(c, 'h1').textContent).toBe('Persona de Prueba');
    expect(c.querySelectorAll('.tarjeta-proyecto').length).toBe(3);
    expect(buscar(c, '#noticias-tecnologia').textContent).toContain('Tec 1');
    expect(buscar(c, '#noticias-personales').textContent).toContain('Personal 1');
  });

  it('incluye un enlace para saltar al contenido (navegación por teclado)', async () => {
    vista = montar(<App cargador={cargadorFalso} />);
    await esperar();
    const salto = buscar(vista.contenedor, '.saltar-contenido');
    expect(salto.getAttribute('href')).toBe('#contenido');
    expect(vista.contenedor.querySelector('main#contenido')).not.toBeNull();
  });

  it('todas las imágenes tienen texto alternativo', async () => {
    vista = montar(<App cargador={cargadorFalso} />);
    await esperar();
    const imagenes = [...vista.contenedor.querySelectorAll('img')];
    expect(imagenes.length).toBeGreaterThan(0);
    imagenes.forEach((img) => expect(img.getAttribute('alt')).toBeTruthy());
  });
});
