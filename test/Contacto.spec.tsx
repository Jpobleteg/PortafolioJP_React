import Contacto, { validarContacto } from '../src/components/Contacto';
import { buscar, enviar, escribir, montar, type Vista } from './helpers';

describe('Formulario de Contacto', () => {
  describe('validarContacto (lógica pura)', () => {
    it('no devuelve errores si los datos son válidos', () => {
      const errores = validarContacto({ nombre: 'Ana', correo: 'ana@correo.cl', mensaje: 'Hola, quiero contactarte.' });
      expect(errores).toEqual({});
    });

    it('detecta nombre vacío, correo inválido y mensaje corto', () => {
      const errores = validarContacto({ nombre: '  ', correo: 'ana@', mensaje: 'corto' });
      expect(Object.keys(errores)).toEqual(['nombre', 'correo', 'mensaje']);
    });
  });

  describe('interacción con el DOM', () => {
    let vista: Vista;
    let alEnviar: jasmine.Spy;
    const campo = (nombre: string) => buscar<HTMLInputElement>(vista.contenedor, `[name="${nombre}"]`);

    beforeEach(() => {
      alEnviar = jasmine.createSpy('onEnviar');
      vista = montar(<Contacto correoDestino="yo@correo.cl" onEnviar={alEnviar} />);
    });

    afterEach(() => vista.desmontar());

    it('renderiza los campos con su etiqueta asociada (accesibilidad)', () => {
      const etiqueta = buscar(vista.contenedor, 'label[for="contacto-correo"]');
      expect(etiqueta.textContent).toBe('Correo electrónico');
      expect(campo('correo').id).toBe('contacto-correo');
      expect(vista.contenedor.querySelector('a[href="mailto:yo@correo.cl"]')).not.toBeNull();
    });

    it('actualiza el estado al escribir en un campo', () => {
      escribir(campo('nombre'), 'Javiera');
      expect(campo('nombre').value).toBe('Javiera');
    });

    it('marca los campos inválidos y no envía si el formulario está vacío', () => {
      enviar(buscar(vista.contenedor, 'form'));

      expect(vista.contenedor.querySelectorAll('.is-invalid').length).toBe(3);
      expect(vista.contenedor.textContent).toContain('Ingresa un correo válido.');
      expect(alEnviar).not.toHaveBeenCalled();
    });

    it('envía los datos, muestra confirmación y limpia el formulario', () => {
      escribir(campo('nombre'), 'Javiera');
      escribir(campo('correo'), 'javiera@correo.cl');
      escribir(campo('mensaje'), 'Me interesa tu trabajo.');

      enviar(buscar(vista.contenedor, 'form'));

      expect(alEnviar).toHaveBeenCalledOnceWith({
        nombre: 'Javiera',
        correo: 'javiera@correo.cl',
        mensaje: 'Me interesa tu trabajo.',
      });
      expect(buscar(vista.contenedor, '.alert-success').textContent).toContain('Tu mensaje fue enviado');
      expect(campo('nombre').value).toBe('');
    });

    it('oculta la confirmación cuando el usuario vuelve a escribir', () => {
      escribir(campo('nombre'), 'Javiera');
      escribir(campo('correo'), 'javiera@correo.cl');
      escribir(campo('mensaje'), 'Mensaje suficientemente largo');
      enviar(buscar(vista.contenedor, 'form'));
      expect(vista.contenedor.querySelector('.alert-success')).not.toBeNull();

      escribir(campo('nombre'), 'B');

      expect(vista.contenedor.querySelector('.alert-success')).toBeNull();
    });
  });
});
