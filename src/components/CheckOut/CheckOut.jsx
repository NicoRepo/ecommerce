import React from "react";
import { useContext } from "react";
import { Context } from "../../Context";
import {
  Card,
  Col,
  Container,
  Row,
  Badge,
  Button,
  Stack,
} from "react-bootstrap";
import { ContactForm } from "./ContactForm";
import { formatPrice } from "../../helpers";
import TextOverflow from "react-text-overflow";

const ProductCard = ({ img, name, price, artist }) => {
  return (
    <Card
      className="mx-2 my-1 d-flex flex-row align-items-center"
      bg="light"
      border="secondary"
    >
      <Card.Img
        className="border rounded"
        variant="left"
        src={img}
        alt={name}
        style={{ width: "80px" }}
      />
      <Card.Body>
        <div className="d-flex flex-row align-items-center">
          <div className="d-flex flex-column">
            <Card.Title className="mb-1">
              <TextOverflow text={name} />
            </Card.Title>
            <Card.Subtitle className="mb-1 text-secondary">
              {artist}
            </Card.Subtitle>
          </div>
          <div className="ms-auto">
            <Badge className="text-dark p-2 border border-success" bg="light">
              $ {formatPrice(price)}
            </Badge>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export const CheckOut = () => {
  const {
    state: { cart },
  } = useContext(Context);
  return (
    <Container as={Card}>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="py-3">
          <Card border="dark">
            <Card.Body>
              <ContactForm />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="py-3">
          <Card border="dark" className="h-100">
            <Card.Body>
              <Card.Title className="text-start">Resumen Pedido</Card.Title>
              <hr />
              <Stack
                className="overflow-auto border border-dark rounded"
                direction="vertical"
                style={{ maxHeight: "610px" }}
              >
                {Object.values(cart).map((p) => (
                  <ProductCard {...p} />
                ))}
              </Stack>
              <hr />
              <div className="d-flex justify-content-end align-items-center gap-3">
                <div className="fs-5 fw-bold border p-1 border-dark rounded">
                  Total: $
                  {formatPrice(
                    Object.values(cart).reduce((a, v) => a + v.qty * v.price, 0)
                  )}
                </div>
                <Button variant="success" disabled type="submit">
                  Confirmar Pedido
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
