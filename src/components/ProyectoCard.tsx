import { Badge, Button, Card } from 'react-bootstrap';
import type { Proyecto } from '../types';


export type ProyectoCardProps = Omit<Proyecto, 'id'>;


function ProyectoCard({ titulo, descripcion, imagen, tecnologias, enlace }: ProyectoCardProps) {
  return (
    <Card className="h-100 tarjeta-proyecto shadow-sm" as="article">
      <Card.Img
        variant="top"
        src={imagen}
        alt={`Captura del proyecto ${titulo}`}
        loading="lazy"
        width={400}
        height={225}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h3" className="h5">{titulo}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>
        <ul className="lista-tecnologias mb-3" aria-label={`Tecnologías de ${titulo}`}>
          {tecnologias.map((tec) => (
            <li key={tec}>
              <Badge bg="secondary">{tec}</Badge>
            </li>
          ))}
        </ul>
        <Button
          href={enlace}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline-primary"
          className="mt-auto"
          aria-label={`Ver repositorio de ${titulo} (se abre en una pestaña nueva)`}
        >
          Ver repositorio
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProyectoCard;
