// Punto de entrada de Karma: carga los estilos y todos los archivos de prueba *.spec.ts(x)
import 'bootstrap/dist/css/bootstrap.min.css';

// Indica a React que estamos en un entorno de pruebas (habilita act())
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const contexto = import.meta.webpackContext('./', { recursive: true, regExp: /\.spec\.tsx?$/ });
contexto.keys().forEach(contexto);
