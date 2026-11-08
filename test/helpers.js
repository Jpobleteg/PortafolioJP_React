// Utilidades compartidas por las pruebas: montar componentes y simular eventos del DOM.
import { act } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * Monta un componente React en un <div> real del documento.
 * @returns {{ contenedor: HTMLElement, desmontar: Function }}
 */
export function montar(elemento) {
  const contenedor = document.createElement('div');
  document.body.appendChild(contenedor);
  const raiz = createRoot(contenedor);
  act(() => {
    raiz.render(elemento);
  });
  return {
    contenedor,
    desmontar() {
      act(() => raiz.unmount());
      contenedor.remove();
    },
  };
}

/** Simula un clic del usuario. */
export function clic(elemento) {
  act(() => {
    elemento.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  });
}

/** Simula que el usuario escribe en un input o textarea (React escucha el evento "input"). */
export function escribir(elemento, valor) {
  const prototipo =
    elemento.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(prototipo, 'value').set;
  act(() => {
    setter.call(elemento, valor);
    elemento.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

/** Simula el envío de un formulario. */
export function enviar(formulario) {
  act(() => {
    formulario.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
}

/** Espera a que se resuelvan las promesas pendientes (por ejemplo, la carga de JSON). */
export async function esperar() {
  await act(async () => {
    await new Promise((resolver) => setTimeout(resolver, 0));
  });
}

/** Promesa controlable manualmente, útil para probar estados de "cargando". */
export function promesaPendiente() {
  let resolver;
  let rechazar;
  const promesa = new Promise((res, rej) => {
    resolver = res;
    rechazar = rej;
  });
  return { promesa, resolver, rechazar };
}
