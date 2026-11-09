import { act } from 'react';
import { createRoot } from 'react-dom/client';


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


export function clic(elemento) {
  act(() => {
    elemento.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  });
}

export function escribir(elemento, valor) {
  const prototipo =
    elemento.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(prototipo, 'value').set;
  act(() => {
    setter.call(elemento, valor);
    elemento.dispatchEvent(new Event('input', { bubbles: true }));
  });
}


export function enviar(formulario) {
  act(() => {
    formulario.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
}
 
export async function esperar() {
  await act(async () => {
    await new Promise((resolver) => setTimeout(resolver, 0));
  });
}

export function promesaPendiente() {
  let resolver;
  let rechazar;
  const promesa = new Promise((res, rej) => {
    resolver = res;
    rechazar = rej;
  });
  return { promesa, resolver, rechazar };
}
