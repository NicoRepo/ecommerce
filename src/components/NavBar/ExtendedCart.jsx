import { Button, Stack } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./index.css";
import { ListProductItem } from "./ListProductItem";
import { formatPrice } from "../../helpers";
import { useNavigate } from "react-router-dom";

export const ExtendedCart = ({ show, handleState, cart }) => {
  const navigate = useNavigate();
  return (
    <Offcanvas
      show={show}
      style={{ width: "500px" }}
      onHide={() => handleState(false)}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="mx-auto">Carrito</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body >
        <Stack direction="vertical" gap={1} style={{ height: 'calc(100vh - 170px)'}}>
          <Stack
            className="overflow-auto"
            direction="vertical"
          >
            {Object.values(cart).map((prod) => (
              <ListProductItem key={prod.id} {...prod} />
            ))}
          </Stack>
        </Stack>
        <Stack
          direction="vertical"
          className="mt-auto"
          gap={2}
        >
          <Stack
            direction="horizontal"
            className="border border-dark bg-light text-center rounded fw-bold"
            gap={2}
          >
            <div className="ms-auto">Total:</div>
            <div className="me-auto">
              $
              {formatPrice(
                Object.values(cart).reduce((a, v) => a + v.qty * v.price, 0)
              )}
            </div>
          </Stack>
          <Button
            disabled={Object.values(cart).length > 0 ? false : true}
            onClick={() => {
              handleState(false);
              navigate("/check-out");
            }}
            variant="dark"
          >
            Finalizar Pedido
          </Button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
