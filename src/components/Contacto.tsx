import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import type { DatosContacto } from '../types';

export type ErroresContacto = Partial<Record<keyof DatosContacto, string>>;

interface ContactoProps {
  correoDestino: string;
  onEnviar?: (datos: DatosContacto) => void;
}

const VACIO: DatosContacto = { nombre: '', correo: '', mensaje: '' };
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export function validarContacto({ nombre, correo, mensaje }: DatosContacto): ErroresContacto {
  const errores: ErroresContacto = {};
  if (!nombre.trim()) errores.nombre = 'Ingresa tu nombre.';
  if (!REGEX_CORREO.test(correo.trim())) errores.correo = 'Ingresa un correo válido.';
  if (mensaje.trim().length < 10) errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
  return errores;
}


function Contacto({ correoDestino, onEnviar }: ContactoProps) {
  const [valores, setValores] = useState<DatosContacto>(VACIO);
  const [errores, setErrores] = useState<ErroresContacto>({});
  const [enviado, setEnviado] = useState(false);

  const manejarCambio = (evento: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evento.target;
    setValores((previo) => ({ ...previo, [name]: value }));
    setEnviado(false);
  };

  const manejarEnvio = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const nuevosErrores = validarContacto(valores);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    if (onEnviar) onEnviar(valores);
    setEnviado(true);
    setValores(VACIO);
  };

  return (
    <section id="contacto" className="seccion bg-light" aria-labelledby="titulo-contacto">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <h2 id="titulo-contacto" className="titulo-seccion">Contacto</h2>
            <p>
              ¿Tienes una idea o propuesta? Escríbeme o envíame un correo a{' '}
              <a href={`mailto:${correoDestino}`}>{correoDestino}</a>.
            </p>

            {enviado && (
              <Alert variant="success" role="status">
                ¡Gracias! Tu mensaje fue enviado correctamente.
              </Alert>
            )}

            <Form noValidate onSubmit={manejarEnvio} aria-label="Formulario de contacto">
              <Row className="g-3">
                <Col xs={12} md={6}>
                  <Form.Group controlId="contacto-nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      name="nombre"
                      value={valores.nombre}
                      onChange={manejarCambio}
                      isInvalid={Boolean(errores.nombre)}
                      autoComplete="name"
                    />
                    <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="contacto-correo">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      name="correo"
                      value={valores.correo}
                      onChange={manejarCambio}
                      isInvalid={Boolean(errores.correo)}
                      autoComplete="email"
                    />
                    <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="contacto-mensaje">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="mensaje"
                      value={valores.mensaje}
                      onChange={manejarCambio}
                      isInvalid={Boolean(errores.mensaje)}
                    />
                    <Form.Control.Feedback type="invalid">{errores.mensaje}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Button type="submit" variant="primary">Enviar mensaje</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Contacto;
