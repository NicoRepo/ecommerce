import { Form, Card, Row, Col, Button } from "react-bootstrap";

export const ContactForm = () => {
  return (
    <Form noValidate onSubmit={() => console.log("Submit")}>
      <Card.Title className="text-start">Contacto</Card.Title>
      <hr />
      <Row className="mb-2">
        <Form.Group
          as={Col}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="mb-2"
          controlId="emailValidation"
        >
          <Form.Label>Correo de Contacto</Form.Label>
          <Form.Control type="email" placeholder="Correo" defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Card.Title className="text-start">Dirección de Envío</Card.Title>
      <hr />
      <Row className="mb-2">
        <Form.Group
          as={Col}
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          className="mb-2"
          controlId="nameValidation"
        >
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Nombre" defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          className="mb-2"
          controlId="nameValidation"
        >
          <Form.Label>Apellido</Form.Label>
          <Form.Control type="text" placeholder="Apellido" defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="mb-2"
          controlId="emailValidation"
        >
          <Form.Label>RUT</Form.Label>
          <Form.Control type="text" placeholder="RUT" defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="mb-2"
          controlId="emailValidation"
        >
          <Form.Label>Dirección</Form.Label>
          <Form.Control type="text" placeholder="Dirección" defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          className="mb-2"
          controlId="emailValidation"
        >
          <Form.Label>Numeración</Form.Label>
          <Form.Control type="text" placeholder="Numeración" defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          className="mb-2"
          controlId="emailValidation"
        >
          <Form.Label>Comuna</Form.Label>
          <Form.Control type="text" placeholder="Comuna" defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="mb-2"
          controlId="emailValidation"
        >
          <Form.Label>Región</Form.Label>
          <Form.Control type="text" placeholder="Región" defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          className="mb-2"
          controlId="emailValidation"
        >
          <Form.Label>Teléfono</Form.Label>
          <Form.Control type="text" placeholder="Teléfono" defaultValue="" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <hr />
      <div className="d-flex justify-content-end">
        <Button variant="outline-dark" type="submit">
          Continuar
        </Button>
      </div>
    </Form>
  );
};
