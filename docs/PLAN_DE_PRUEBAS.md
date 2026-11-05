# Plan de pruebas – Portafolio personal (DSY1104)

## 1. Objetivo
Verificar que los componentes del portafolio se rendericen correctamente, gestionen bien su estado (state) y sus propiedades (props), respondan a los eventos del usuario y manipulen el DOM como se espera.

## 2. Alcance
| Incluido | Excluido |
|---|---|
| Componentes React de `src/components` | Estilos visuales (CSS) |
| Servicio de datos y hook `useDatosJSON` | `src/main.tsx` (solo monta la app) |
| Componente raíz `App` (integración) | Despliegue en GitHub Pages |

## 3. Herramientas
- **Jasmine**: framework para escribir las pruebas (`describe`, `it`, `expect`, `spyOn`).
- **Karma**: ejecuta las pruebas en navegadores reales (Chrome Headless; Firefox opcional con `npm run test:all`).
- **karma-webpack + Babel** (`@babel/preset-typescript`): compila TypeScript/TSX para el navegador.
- **TypeScript** (`npm run typecheck`): verifica los tipos de componentes, props y pruebas.
- **istanbul / karma-coverage**: genera el informe de cobertura en `coverage/html/index.html`.

## 4. Simulación de entornos (mocks)
- `spyOn(window, 'fetch')` reemplaza la red para probar `cargarJSON` sin archivos reales.
- `jasmine.createSpy('cargador')` reemplaza la función que lee los JSON en `SeccionNoticias` y `App` (respuestas exitosas, vacías, con error o pendientes).
- `jasmine.createSpy('onEnviar')` verifica que el formulario entregue los datos correctos.
- `spyOn(console, 'error')` comprueba que no haya advertencias de React al desmontar.

## 5. Casos de prueba

| ID | Componente | Caso | Resultado esperado | Tipo |
|---|---|---|---|---|
| CP-01 | datosService | `cargarJSON` con respuesta 200 | Devuelve el objeto del JSON | Lógica + mock |
| CP-02 | datosService | `cargarJSON` con respuesta 404 | Lanza error "No se pudo cargar…" | Lógica + mock |
| CP-03 | datosService | `formatearFecha('2026-11-04')` | "4 de noviembre de 2026" | Lógica |
| CP-04 | datosService | Fecha inválida | "Fecha no disponible" | Lógica |
| CP-05 | datosService | `ordenarPorFecha` | Más reciente primero, sin mutar el original | Lógica |
| CP-06 | BarraNavegacion | Render con props | Nombre en la marca y un enlace por sección | Renderizado |
| CP-07 | BarraNavegacion | Clic en botón hamburguesa | El menú se expande (clase `collapsed` se quita) | Evento + DOM |
| CP-08 | Introduccion | Render | h1 con nombre, foto con `alt`, biografía | Renderizado / accesibilidad |
| CP-09 | SobreMi | Con y sin habilidades | Muestra badges / oculta la lista | Renderizado condicional |
| CP-10 | ProyectoCard | Render | Card con imagen lazy, título, tecnologías y enlace seguro | Renderizado |
| CP-11 | Proyectos | Render inicial | 3 tarjetas y botones de filtro sin repetir | Renderizado |
| CP-12 | Proyectos | Clic en "React" | 2 tarjetas, `aria-pressed="true"` | Evento + state |
| CP-13 | Proyectos | Clic en "Todas" | Vuelven las 3 tarjetas | Evento + state |
| CP-14 | Proyectos | Lista vacía | Mensaje "No hay proyectos…" | Caso borde |
| CP-15 | Noticia | Render | Título, `<time>` con fecha formateada y contenido | Renderizado |
| CP-16 | SeccionNoticias | Carga pendiente | Indicador "Cargando noticias…" | State + mock |
| CP-17 | SeccionNoticias | Carga exitosa | Noticias ordenadas, solo el límite inicial | Integración JSON |
| CP-18 | SeccionNoticias | Clic en "Ver todas" / "Ver menos" | Muestra/oculta noticias y cambia `aria-expanded` | Evento + state |
| CP-19 | SeccionNoticias | Error de carga | Alerta roja con el mensaje | Manejo de errores |
| CP-20 | SeccionNoticias | JSON vacío / pocas noticias | Mensaje vacío / sin botón | Caso borde |
| CP-21 | SeccionNoticias | Desmontar antes de cargar | No hay errores en consola | Ciclo de vida |
| CP-22 | Contacto | `validarContacto` | Errores correctos por campo | Lógica |
| CP-23 | Contacto | Escribir en un campo | El valor se guarda en el estado | Evento + DOM |
| CP-24 | Contacto | Enviar vacío | 3 campos `is-invalid`, no se llama `onEnviar` | Evento + DOM |
| CP-25 | Contacto | Enviar válido | Llama `onEnviar`, muestra éxito y limpia | Evento + mock |
| CP-26 | PiePagina | Con y sin redes | Año actual y enlaces condicionales | Renderizado |
| CP-27 | App | Carga / error / éxito | Spinner, alerta o todas las secciones | Integración |
| CP-28 | App | Accesibilidad | Enlace "saltar al contenido" y `alt` en todas las imágenes | Accesibilidad |

## 6. Criterio de aceptación
- 100 % de las pruebas en verde.
- Cobertura mínima configurada en Karma: 80 % de sentencias, funciones y líneas; 70 % de ramas.

## 7. Resultados obtenidos
- **45 pruebas ejecutadas, 45 exitosas, 0 fallidas** (Chrome Headless).
- **Cobertura:** 100 % sentencias (102/102) · 86,56 % ramas (58/67) · 100 % funciones (36/36) · 100 % líneas (88/88).
- Las ramas no cubiertas corresponden a valores por defecto de props (por ejemplo `cargador = cargarJSON`) y operadores de respaldo como `??`, que en producción se usan pero en las pruebas se reemplazan por mocks.
