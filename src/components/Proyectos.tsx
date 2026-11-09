import { useMemo, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import ProyectoCard from './ProyectoCard';
import type { Proyecto } from '../types';

interface ProyectosProps {
  proyectos?: Proyecto[];
}

export const TODAS = 'Todas';


function Proyectos({ proyectos = [] }: ProyectosProps) {
  const [filtro, setFiltro] = useState<string>(TODAS);

  
  const tecnologias = useMemo<string[]>(() => {
    const unicas = new Set(proyectos.flatMap((p) => p.tecnologias));
    return [TODAS, ...unicas];
  }, [proyectos]);

  const visibles =
    filtro === TODAS ? proyectos : proyectos.filter((p) => p.tecnologias.includes(filtro));

  return (
    <section id="proyectos" className="seccion" aria-labelledby="titulo-proyectos">
      <Container>
        <h2 id="titulo-proyectos" className="titulo-seccion">Proyectos</h2>

        <div className="mb-4 overflow-auto">
          <ButtonGroup aria-label="Filtrar proyectos por tecnología" className="flex-wrap">
            {tecnologias.map((tec) => (
              <Button
                key={tec}
                variant={filtro === tec ? 'primary' : 'outline-primary'}
                aria-pressed={filtro === tec}
                onClick={() => setFiltro(tec)}
              >
                {tec}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <p className="visually-hidden" aria-live="polite">
          {`Mostrando ${visibles.length} de ${proyectos.length} proyectos`}
        </p>

        {/* Grid System: 1 columna en móvil, 2 en tablet, 3 en escritorio */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {visibles.map((proyecto) => (
            <Col key={proyecto.id}>
              <ProyectoCard {...proyecto} />
            </Col>
          ))}
        </Row>

        {visibles.length === 0 && (
          <p className="text-muted">No hay proyectos con esa tecnología.</p>
        )}
      </Container>
    </section>
  );
}

export default Proyectos;
