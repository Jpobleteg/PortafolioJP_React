# Portafolio personal – React + Bootstrap

Portafolio personal desarrollado para la **Evaluación Formativa N° 2** de **DSY1104 – Desarrollo Fullstack II**.
Construido con **React 18 + TypeScript (TSX)**, **React-Bootstrap**, datos en **archivos JSON** y pruebas unitarias con **Jasmine + Karma**.

🔗 **Demo:** (https://github.com/Jpobleteg/PortafolioJP_React)



## Características
- **Secciones:** Introducción (nombre, foto y biografía), Sobre mí, Proyectos, dos secciones de Noticias y Contacto.
- **Bootstrap:** Navbar, Card, Button, Form, Badge, Alert, Spinner y Grid System (`Container`, `Row`, `Col`).
- **Componentes personalizados reutilizables** que reciben props tipadas con interfaces de TypeScript (`src/types.ts`).
- **State y props:** filtro de proyectos por tecnología, "Ver todas" en noticias, formulario controlado con validación.
- **Datos en JSON** (`public/data`) cargados con `fetch` mediante el hook `useDatosJSON`.
- **Responsivo:** 1 columna en móvil, 2 en tablet y 3 en escritorio; menú hamburguesa en pantallas pequeñas.
- **Accesibilidad:** textos `alt`, enlace "Saltar al contenido", etiquetas en formularios, foco visible, `aria-*`.
- **Rendimiento:** imágenes SVG livianas con `loading="lazy"`, build minificado con Vite.

## Requisitos
- [Node.js](https://nodejs.org/) 18 o superior (incluye npm)

> **Windows:** si PowerShell muestra *"la ejecución de scripts está deshabilitada"*, ejecuta una vez
> `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` o usa `npm.cmd` en lugar de `npm`.
- Google Chrome (para ejecutar las pruebas con Karma)
- Git

## Instalación
```bash
git clone https://github.com/Jpobleteg/PortafolioJP_React.git
cd portafolio-react
npm install
```

## Ejecutar en modo desarrollo
```bash
npm run dev
```
Abre (http://localhost:5173/) en el navegador.

## Ejecutar las pruebas
```bash
npm test             # Jasmine + Karma en Chrome Headless, con informe de cobertura
npm run test:watch   # Modo observador: vuelve a ejecutar al guardar cambios
npm run test:all     # Chrome y Firefox (requiere Firefox instalado)
npm run typecheck    # Revisa los tipos de TypeScript (tsc --noEmit)
```
El informe de cobertura queda en `coverage/html/index.html`.

> Si Karma no encuentra Chrome, define la variable `CHROME_BIN` con la ruta del ejecutable.
> Windows (PowerShell): `$env:CHROME_BIN="C:\Program Files\Google\Chrome\Application\chrome.exe"`


## Autor
Javiera Poblete – DSY1104 Desarrollo Fullstack II
