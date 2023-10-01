import React, { useState, useContext } from "react";
import { Context } from "../../CartContext";
import { ContactForm } from "./ContactForm";
import { formatPrice } from "../../helpers";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { createOrder } from "../../API/API_V2";
import { ProductCard } from "./ProductCard";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Stack,
} from "react-bootstrap";



export const CheckOut = () => {
  const {
    state: { cart },
  } = useContext(Context);

  const [confirmState, setConfirmState] = useState(true);
  const [formEditable, setFormEditable] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();
  const {dispatch} = useContext(Context);
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
    data["productIds"] = Object.values(cart).reduce((a,v) => {
      return {...a, [v._id]: v.qty}
    }, {});
    setOrderData(data);
  };

  const placeOrder = () => {
    createOrder(orderData).then((created) => {
      const { orderId = null } = created;
      if(orderId){
        toast.success("Orden creada exitosamente", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch({type: "EMPTY_CART"})
        navigate(`/order/${orderId}`)
      }
     });
  }

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
                  <ProductCard key={`p-card-${p._id}`} {...p} />
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
                <Button variant="success" disabled={confirmState} onClick={placeOrder} type="submit">
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
