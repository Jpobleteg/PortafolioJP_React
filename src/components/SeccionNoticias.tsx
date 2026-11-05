import { useState, type ReactNode } from 'react';
import { Alert, Button, Col, Row, Spinner } from 'react-bootstrap';
import Noticia from './Noticia';
import { cargarJSON, ordenarPorFecha } from '../services/datosService';
import { useDatosJSON } from '../services/useDatosJSON';
import type { Cargador, NoticiaDatos } from '../types';

interface SeccionNoticiasProps {
  id: string;
  titulo: string;
  ruta: string;
  limite?: number;
  cargador?: Cargador;
}

/**
 * Sección de noticias que se carga dinámicamente desde un archivo JSON.
 * Es reutilizable: el portafolio la usa dos veces con archivos distintos.
 */
function SeccionNoticias({ id, titulo, ruta, limite = 2, cargador = cargarJSON }: SeccionNoticiasProps) {
  const { datos, cargando, error } = useDatosJSON<NoticiaDatos[]>(ruta, cargador);
  const [verTodas, setVerTodas] = useState(false);

  let contenido: ReactNode;
  if (cargando) {
    contenido = (
      <div className="text-center py-3" role="status">
        <Spinner animation="border" size="sm" className="me-2" aria-hidden="true" />
        Cargando noticias…
      </div>
    );
  } else if (error) {
    contenido = <Alert variant="danger">{`No fue posible cargar las noticias. ${error}`}</Alert>;
  } else if (!datos || datos.length === 0) {
    contenido = <p className="text-muted">No hay noticias por ahora.</p>;
  } else {
    const ordenadas = ordenarPorFecha(datos);
    const visibles = verTodas ? ordenadas : ordenadas.slice(0, limite);
    contenido = (
      <>
        <Row xs={1} md={2} className="g-3" id={`${id}-lista`}>
          {visibles.map((n) => (
            <Col key={n.id}>
              <Noticia titulo={n.titulo} fecha={n.fecha} contenido={n.contenido} />
            </Col>
          ))}
        </Row>
        {ordenadas.length > limite && (
          <Button
            variant="link"
            className="px-0 mt-2"
            aria-expanded={verTodas}
            aria-controls={`${id}-lista`}
            onClick={() => setVerTodas((valor) => !valor)}
          >
            {verTodas ? 'Ver menos' : `Ver todas (${ordenadas.length})`}
          </Button>
        )}
      </>
    );
  }

  return (
    <section id={id} className="mb-5" aria-labelledby={`${id}-titulo`}>
      <h3 id={`${id}-titulo`} className="h4 mb-3">{titulo}</h3>
      {contenido}
    </section>
  );
}

export default SeccionNoticias;
