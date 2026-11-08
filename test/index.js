// Punto de entrada de Karma: carga los estilos y todos los archivos de prueba *.spec.js(x)
import 'bootstrap/dist/css/bootstrap.min.css';

// Indica a React que estamos en un entorno de pruebas (habilita act())
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const contexto = import.meta.webpackContext('./', { recursive: true, regExp: /\.spec\.jsx?$/ });
contexto.keys().forEach(contexto);
