import { Container } from 'react-bootstrap';
import type { Redes } from '../types';

interface PiePaginaProps {
  nombre: string;
  redes?: Redes;
}

/**
 * Pie de página con enlaces a redes.
 */
function PiePagina({ nombre, redes = {} }: PiePaginaProps) {
  const anio = new Date().getFullYear();
  return (
    <footer className="bg-dark text-light py-4">
      <Container className="d-flex flex-column flex-md-row justify-content-between gap-2">
        <p className="mb-0">© {anio} {nombre}. Hecho con React y Bootstrap.</p>
        <nav aria-label="Redes sociales" className="d-flex gap-3">
          {redes.github && (
            <a className="link-light" href={redes.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          )}
          {redes.linkedin && (
            <a className="link-light" href={redes.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          )}
        </nav>
      </Container>
    </footer>
  );
}

export default PiePagina;
