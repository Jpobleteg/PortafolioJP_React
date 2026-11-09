import { Container, Nav, Navbar } from 'react-bootstrap';
import type { Enlace } from '../types';

interface BarraNavegacionProps {
  nombre: string;
  enlaces: Enlace[];
}

function BarraNavegacion({ nombre, enlaces }: BarraNavegacionProps) {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top" collapseOnSelect>
      <Container>
        <Navbar.Brand href="#inicio">{nombre}</Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" label="Abrir menú de navegación" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto" as="ul">
            {enlaces.map((enlace) => (
              <Nav.Item as="li" key={enlace.id}>
                <Nav.Link href={`#${enlace.id}`}>{enlace.texto}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraNavegacion;
