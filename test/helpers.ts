import { act, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';

export interface Vista {
  contenedor: HTMLElement;
  desmontar: () => void;
}


export function montar(elemento: ReactElement): Vista {
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


export function clic(elemento: Element) {
  act(() => {
    elemento.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  });
}


export function escribir(elemento: HTMLInputElement | HTMLTextAreaElement, valor: string) {
  const prototipo =
    elemento.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(prototipo, 'value')!.set!;
  act(() => {
    setter.call(elemento, valor);
    elemento.dispatchEvent(new Event('input', { bubbles: true }));
  });
}


export function enviar(formulario: Element) {
  act(() => {
    formulario.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
}


export async function esperar() {
  await act(async () => {
    await new Promise((resolver) => setTimeout(resolver, 0));
  });
}

export function promesaPendiente<T = unknown>() {
  let resolver!: (valor: T) => void;
  let rechazar!: (motivo: unknown) => void;
  const promesa = new Promise<T>((res, rej) => {
    resolver = res;
    rechazar = rej;
  });
  return { promesa, resolver, rechazar };
}


export function buscar<T extends Element = HTMLElement>(raiz: ParentNode, selector: string): T {
  const elemento = raiz.querySelector<T>(selector);
  if (!elemento) throw new Error(`No se encontró el elemento "${selector}"`);
  return elemento;
}
