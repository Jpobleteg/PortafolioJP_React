import { Card } from 'react-bootstrap';
import { formatearFecha } from '../services/datosService';
import type { NoticiaDatos } from '../types';

type NoticiaProps = Omit<NoticiaDatos, 'id'>;


function Noticia({ titulo, fecha, contenido }: NoticiaProps) {
  return (
    <Card as="article" className="h-100 noticia border-0 border-start border-4 border-primary shadow-sm">
      <Card.Body>
        <Card.Title as="h4" className="h6 mb-1">{titulo}</Card.Title>
        <time dateTime={fecha} className="small text-muted d-block mb-2">
          {formatearFecha(fecha)}
        </time>
        <Card.Text className="mb-0">{contenido}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Noticia;
