import { Badge, Col, Container, Row } from 'react-bootstrap';

interface SobreMiProps {
  descripcion: string;
  habilidades?: string[];
}

/**
 * Sección "Sobre mí" (componente personalizado y reutilizable).
 */
function SobreMi({ descripcion, habilidades = [] }: SobreMiProps) {
  return (
    <section id="sobre-mi" className="seccion bg-light" aria-labelledby="titulo-sobre-mi">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <h2 id="titulo-sobre-mi" className="titulo-seccion">Sobre mí</h2>
            <p className="fs-5">{descripcion}</p>
            {habilidades.length > 0 && (
              <>
                <h3 className="h5 mt-4">Habilidades</h3>
                <ul className="lista-habilidades" aria-label="Habilidades">
                  {habilidades.map((habilidad) => (
                    <li key={habilidad}>
                      <Badge bg="primary" className="fs-6 fw-normal">{habilidad}</Badge>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default SobreMi;
