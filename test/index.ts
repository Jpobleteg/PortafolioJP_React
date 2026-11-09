
import 'bootstrap/dist/css/bootstrap.min.css';



(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const contexto = import.meta.webpackContext('./', { recursive: true, regExp: /\.spec\.tsx?$/ });
contexto.keys().forEach(contexto);

