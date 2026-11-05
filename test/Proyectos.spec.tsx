import Proyectos from '../src/components/Proyectos';
import type { Proyecto } from '../src/types';
import { clic, montar, type Vista } from './helpers';

const PROYECTOS: Proyecto[] = [
  { id: 1, titulo: 'Tienda', descripcion: 'd1', imagen: 'img/proyecto-tienda.svg', tecnologias: ['React', 'Bootstrap'], enlace: '#' },
  { id: 2, titulo: 'Tareas', descripcion: 'd2', imagen: 'img/proyecto-tareas.svg', tecnologias: ['JavaScript'], enlace: '#' },
  { id: 3, titulo: 'API', descripcion: 'd3', imagen: 'img/proyecto-api.svg', tecnologias: ['Java', 'React'], enlace: '#' },
];

describe('Componente Proyectos (state + eventos)', () => {
  let vista: Vista;
  const tarjetas = () => vista.contenedor.querySelectorAll('.tarjeta-proyecto');
  const boton = (texto: string): HTMLButtonElement =>
    [...vista.contenedor.querySelectorAll('[aria-label="Filtrar proyectos por tecnología"] button')].find(
      (b) => b.textContent === texto
    ) as HTMLButtonElement;

  afterEach(() => vista.desmontar());

  it('muestra una tarjeta por cada proyecto (al menos tres)', () => {
    vista = montar(<Proyectos proyectos={PROYECTOS} />);
    expect(tarjetas().length).toBe(3);
  });

  it('genera un botón de filtro por cada tecnología sin repetir', () => {
    vista = montar(<Proyectos proyectos={PROYECTOS} />);
    const textos = [...vista.contenedor.querySelectorAll('.btn-group button')].map((b) => b.textContent);
    expect(textos).toEqual(['Todas', 'React', 'Bootstrap', 'JavaScript', 'Java']);
  });

  it('filtra los proyectos al hacer clic en una tecnología y actualiza aria-pressed', () => {
    vista = montar(<Proyectos proyectos={PROYECTOS} />);

    clic(boton('React'));

    expect(tarjetas().length).toBe(2);
    expect(boton('React').getAttribute('aria-pressed')).toBe('true');
    expect(boton('Todas').getAttribute('aria-pressed')).toBe('false');
    expect(vista.contenedor.textContent).toContain('Mostrando 2 de 3 proyectos');
  });

  it('vuelve a mostrar todos los proyectos al elegir "Todas"', () => {
    vista = montar(<Proyectos proyectos={PROYECTOS} />);

    clic(boton('Java'));
    expect(tarjetas().length).toBe(1);

    clic(boton('Todas'));
    expect(tarjetas().length).toBe(3);
  });

  it('muestra un mensaje cuando no hay proyectos', () => {
    vista = montar(<Proyectos proyectos={[]} />);
    expect(vista.contenedor.textContent).toContain('No hay proyectos con esa tecnología.');
  });
});
