import { Button, Col, Container, Image, Row } from 'react-bootstrap';

export interface IntroduccionProps {
  nombre: string;
  titulo: string;
  foto: string;
  biografia: string;
}

/**
 * Sección de introducción: nombre, foto profesional y biografía breve.
 */
function Introduccion({ nombre, titulo, foto, biografia }: IntroduccionProps) {
  return (
    <section id="inicio" className="seccion seccion-intro" aria-labelledby="titulo-intro">
      <Container>
        <Row className="align-items-center g-4">
          <Col xs={12} md={4} className="text-center">
            <Image
              src={foto}
              alt={`Foto profesional de ${nombre}`}
              roundedCircle
              className="foto-perfil shadow"
              width={220}
              height={220}
            />
          </Col>
          <Col xs={12} md={8}>
            <p className="text-uppercase text-primary fw-semibold mb-1">Hola, soy</p>
            <h1 id="titulo-intro" className="display-5 fw-bold">{nombre}</h1>
            <p className="lead text-secondary">{titulo}</p>
            <p className="biografia">{biografia}</p>
            <div className="d-flex flex-wrap gap-2">
              <Button href="#proyectos" variant="primary">Ver proyectos</Button>
              <Button href="#contacto" variant="outline-primary">Contactarme</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Introduccion;
