import { Alert, Container, Spinner } from 'react-bootstrap';
import BarraNavegacion from './components/BarraNavegacion';
import Introduccion from './components/Introduccion';
import SobreMi from './components/SobreMi';
import Proyectos from './components/Proyectos';
import SeccionNoticias from './components/SeccionNoticias';
import Contacto from './components/Contacto';
import PiePagina from './components/PiePagina';
import { cargarJSON } from './services/datosService';
import { useDatosJSON } from './services/useDatosJSON';
import type { Cargador, Enlace, Perfil, Proyecto } from './types';

export const ENLACES: Enlace[] = [
  { id: 'inicio', texto: 'Inicio' },
  { id: 'sobre-mi', texto: 'Sobre mí' },
  { id: 'proyectos', texto: 'Proyectos' },
  { id: 'noticias', texto: 'Noticias' },
  { id: 'contacto', texto: 'Contacto' },
];


function App({ cargador = cargarJSON }: { cargador?: Cargador }) {
  const perfil = useDatosJSON<Perfil>('data/perfil.json', cargador);
  const proyectos = useDatosJSON<Proyecto[]>('data/proyectos.json', cargador);

  if (perfil.cargando) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center" role="status">
        <Spinner animation="border" className="me-2" aria-hidden="true" /> Cargando portafolio…
      </div>
    );
  }

  if (perfil.error || !perfil.datos) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{`Ocurrió un error al cargar el portafolio: ${perfil.error ?? 'sin datos'}`}</Alert>
      </Container>
    );
  }

  const datos = perfil.datos;

  return (
    <>
      <a href="#contenido" className="saltar-contenido">Saltar al contenido principal</a>
      <BarraNavegacion nombre={datos.nombre} enlaces={ENLACES} />
      <main id="contenido" tabIndex={-1}>
        <Introduccion
          nombre={datos.nombre}
          titulo={datos.titulo}
          foto={datos.foto}
          biografia={datos.biografia}
        />
        <SobreMi descripcion={datos.sobreMi} habilidades={datos.habilidades} />
        <Proyectos proyectos={proyectos.datos || []} />

        <section id="noticias" className="seccion" aria-labelledby="titulo-noticias">
          <Container>
            <h2 id="titulo-noticias" className="titulo-seccion">Noticias</h2>
            <SeccionNoticias
              id="noticias-tecnologia"
              titulo="Noticias de tecnología"
              ruta="data/noticias-tecnologia.json"
              cargador={cargador}
            />
            <SeccionNoticias
              id="noticias-personales"
              titulo="Mis novedades"
              ruta="data/noticias-personales.json"
              cargador={cargador}
            />
          </Container>
        </section>

        <Contacto correoDestino={datos.redes.correo ?? ''} />
      </main>
      <PiePagina nombre={datos.nombre} redes={datos.redes} />
    </>
  );
}

export default App;
