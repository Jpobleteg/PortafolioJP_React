import SobreMi from '../src/components/SobreMi';
import { buscar, montar } from './helpers';

describe('Componente SobreMi', () => {
  it('muestra la descripción y una etiqueta por cada habilidad', () => {
    const vista = montar(<SobreMi descripcion="Texto de prueba" habilidades={['React', 'Git']} />);

    expect(buscar(vista.contenedor, 'p').textContent).toBe('Texto de prueba');
    const etiquetas = vista.contenedor.querySelectorAll('.lista-habilidades .badge');
    expect(etiquetas.length).toBe(2);
    expect(etiquetas[0].textContent).toBe('React');

    vista.desmontar();
  });

  it('no muestra la lista de habilidades si no se entregan', () => {
    const vista = montar(<SobreMi descripcion="Solo descripción" />);

    expect(vista.contenedor.querySelector('.lista-habilidades')).toBeNull();

    vista.desmontar();
  });
});
