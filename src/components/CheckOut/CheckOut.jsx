import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../../Context";
import { ContactForm } from "./ContactForm";
import { formatPrice } from "../../helpers";
import TextOverflow from "react-text-overflow";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Row,
  Badge,
  Button,
  Stack,
} from "react-bootstrap";

const ProductCard = ({ id, img, name, price, artist }) => {
  return (
    <Card
      key={id}
      className="my-1 d-flex flex-row align-items-center"
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

  const [confirmState, setConfirmState] = useState(true);
  const [formEditable, setFormEditable] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      region: "15",
    },
  });

  const onSubmit = (data) => {
    setConfirmState(false);
    setFormEditable(true);
  };

  const onError = (error) => {
    toast.error(`No has completado el formulario de contacto`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return Object.values(cart).length ? (
    <Container as={Card}>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="py-3">
          <Card border="dark">
            <ContactForm
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              getValues={getValues}
              onError={onError}
              formEditable={formEditable}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} className="py-3">
          <Card border="dark" className="h-100">
            <Card.Body style={{ height: "730px" }}>
              <Card.Title className="text-start">Resumen Pedido</Card.Title>
              <hr />
              <Stack
                className="overflow-auto"
                direction="vertical"
                style={{ height: "630px" }}
              >
                {Object.values(cart).map((p) => (
                  <ProductCard key={`p-card-${p.id}`} {...p} />
                ))}
              </Stack>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-end mt-auto align-items-center gap-3">
                <div
                  className="border border-dark rounded"
                  style={{ padding: "0.375rem 0.75rem" }}
                >
                  Total: $
                  {formatPrice(
                    Object.values(cart).reduce((a, v) => a + v.qty * v.price, 0)
                  )}
                </div>
                <Button variant="success" disabled={confirmState} type="submit">
                  Confirmar Pedido
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <Navigate to="/" />
  );
};
