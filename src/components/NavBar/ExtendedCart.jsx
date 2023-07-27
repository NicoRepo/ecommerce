import { Button, Stack, ListGroup } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./index.css";
import { ListProductItem } from "./ListProductItem";
import { formatPrice } from "../../helpers";
import { useNavigate } from "react-router-dom";

export const ExtendedCart = ({ show, handleState, cart }) => {
  const navigate = useNavigate();
  return (
    <Offcanvas show={show} onHide={() => handleState(false)} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="mx-auto">Carrito</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack direction="vertical" gap={3} style={{ height: "88vh" }}>
          <div className="p-2 mb-auto">
            <ListGroup>
              {Object.values(cart).map((prod) => (
                <ListProductItem key={prod.id} {...prod} />
              ))}
            </ListGroup>
          </div>
          <div>
            <hr />
            <Stack direction="vertical" gap={3}>
              <Stack
                direction="horizontal"
                className="border border-dark bg-light text-center rounded fw-bold"
                gap={2}
              >
                <div className="ms-auto">Total:</div>
                <div className="me-auto">${formatPrice(Object.values(cart).reduce((a,v) => a+v.qty*v.price, 0))}</div>
              </Stack>
              <Button onClick={() => {
                handleState(false);
                navigate("/check-out");
              }} variant="dark"> Check-Out</Button>
            </Stack>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
