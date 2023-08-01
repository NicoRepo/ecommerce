import { useEffect, useState } from "react";
import { Card, Button, Stack, InputGroup, Form, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { ListProductItem } from "../NavBar/ListProductItem";
import { getOrder } from "../../API/API";
import { formatPrice } from "../../helpers";

export const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getOrder({ orderId }).then((order) => {
      if(order){
        setOrderData(order);
      }else{
        navigate("/not-found");
      }
      
    });
  }, [orderId]);

  return orderData ? (
    <Card style={{ width: "40rem" }}>
      <Card.Body>
        <Card.Title className="text-start">Orden Realizada</Card.Title>
        <Stack direction="vertical">
          <Card.Text>
            Tu orden se ha generado exitosamente. Recibirás un correo a la
            dirección <Badge bg="dark">{orderData.email}</Badge> a la brevedad
            con el detalle de tu pedido.
          </Card.Text>
          <InputGroup className="mb-3">
            <InputGroup.Text id="order-id">ID Orden</InputGroup.Text>
            <Form.Control
              disabled
              defaultValue={orderData.id}
              aria-label="ID Pedido"
              aria-describedby="order-id"
            />
          </InputGroup>
          <Card.Subtitle className="text-start">Resumen</Card.Subtitle>
          {orderData.orderDetail.map((prod) => (
            <ListProductItem
              key={`resume-${prod.id}`}
              {...prod}
              readOnly={true}
            />
          ))}
        </Stack>
        <div className="d-flex justify-content-center mt-2">
          <Button disabled className="fw-bold" variant="outline-success">
            Total: $ {formatPrice(orderData.orderDetail.reduce((a, v) => a + v.qty * v.price, 0))}
          </Button>
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-end">
          <Button variant="outline-dark" onClick={() => navigate("/")}>
            Volver al Inicio
          </Button>
        </div>
      </Card.Footer>
    </Card>
  ) : (
    <Loading />
  );
};
