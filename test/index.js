import 'bootstrap/dist/css/bootstrap.min.css';


globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const contexto = import.meta.webpackContext('./', { recursive: true, regExp: /\.spec\.jsx?$/ });
contexto.keys().forEach(contexto);
