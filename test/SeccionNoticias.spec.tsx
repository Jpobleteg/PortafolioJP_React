import SeccionNoticias from '../src/components/SeccionNoticias';
import { buscar, clic, esperar, montar, promesaPendiente, type Vista } from './helpers';

const NOTICIAS = [
  { id: 1, titulo: 'Antigua', fecha: '2026-01-01', contenido: 'c1' },
  { id: 2, titulo: 'Reciente', fecha: '2026-10-01', contenido: 'c2' },
  { id: 3, titulo: 'Intermedia', fecha: '2026-05-01', contenido: 'c3' },
];

describe('Componente SeccionNoticias (carga desde JSON)', () => {
  let vista: Vista | null;
  const titulos = () => [...vista!.contenedor.querySelectorAll('.noticia .card-title')].map((t) => t.textContent);

  afterEach(() => vista && vista.desmontar());

  it('muestra un indicador de carga mientras se lee el JSON', () => {
    // MOCK: un cargador que nunca termina, para observar el estado "cargando"
    const { promesa } = promesaPendiente();
    const cargador = jasmine.createSpy('cargador').and.returnValue(promesa);

    vista = montar(<SeccionNoticias id="n" titulo="Noticias" ruta="data/n.json" cargador={cargador} />);

    expect(cargador).toHaveBeenCalledWith('data/n.json');
    expect(buscar(vista!.contenedor, '[role="status"]').textContent).toContain('Cargando noticias');
  });

  it('carga las noticias, las ordena por fecha y muestra solo el límite inicial', async () => {
    const cargador = jasmine.createSpy('cargador').and.resolveTo(NOTICIAS);

    vista = montar(<SeccionNoticias id="n" titulo="Noticias" ruta="data/n.json" limite={2} cargador={cargador} />);
    await esperar();

    expect(buscar(vista!.contenedor, 'h3').textContent).toBe('Noticias');
    expect(titulos()).toEqual(['Reciente', 'Intermedia']);
  });

  it('el botón "Ver todas" muestra y oculta el resto de noticias (evento + state)', async () => {
    const cargador = jasmine.createSpy('cargador').and.resolveTo(NOTICIAS);
    vista = montar(<SeccionNoticias id="n" titulo="Noticias" ruta="data/n.json" limite={2} cargador={cargador} />);
    await esperar();

    const boton = buscar(vista!.contenedor, 'button');
    expect(boton.textContent).toBe('Ver todas (3)');
    expect(boton.getAttribute('aria-expanded')).toBe('false');

    clic(boton);
    expect(titulos().length).toBe(3);
    expect(boton.textContent).toBe('Ver menos');
    expect(boton.getAttribute('aria-expanded')).toBe('true');

    clic(boton);
    expect(titulos().length).toBe(2);
  });

  it('no muestra el botón si hay menos noticias que el límite', async () => {
    const cargador = jasmine.createSpy('cargador').and.resolveTo(NOTICIAS.slice(0, 1));
    vista = montar(<SeccionNoticias id="n" titulo="Noticias" ruta="data/n.json" cargador={cargador} />);
    await esperar();

    expect(vista!.contenedor.querySelector('button')).toBeNull();
  });

  it('muestra una alerta si ocurre un error al cargar', async () => {
    const cargador = jasmine.createSpy('cargador').and.rejectWith(new Error('Archivo no encontrado'));
    vista = montar(<SeccionNoticias id="n" titulo="Noticias" ruta="data/x.json" cargador={cargador} />);
    await esperar();

    const alerta = buscar(vista!.contenedor, '.alert-danger');
    expect(alerta).not.toBeNull();
    expect(alerta.textContent).toContain('Archivo no encontrado');
  });

  it('muestra un mensaje si el JSON viene vacío', async () => {
    const cargador = jasmine.createSpy('cargador').and.resolveTo([]);
    vista = montar(<SeccionNoticias id="n" titulo="Noticias" ruta="data/n.json" cargador={cargador} />);
    await esperar();

    expect(vista!.contenedor.textContent).toContain('No hay noticias por ahora.');
  });

  it('no actualiza el estado si el componente se desmonta antes de terminar la carga', async () => {
    const pendiente = promesaPendiente();
    const cargador = jasmine.createSpy('cargador').and.returnValue(pendiente.promesa);
    const consola = spyOn(console, 'error');

    vista = montar(<SeccionNoticias id="n" titulo="Noticias" ruta="data/n.json" cargador={cargador} />);
    vista.desmontar();
    vista = null;

    pendiente.resolver(NOTICIAS);
    await esperar();

    expect(consola).not.toHaveBeenCalled();
  });
});
