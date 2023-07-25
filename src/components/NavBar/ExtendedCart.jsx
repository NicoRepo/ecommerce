import {
  Button,
  Stack,
  ListGroup,
} from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./index.css";
import { ListProductItem } from "./ListProductItem";




export const ExtendedCart = ({ show, handleState, cart }) => {
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
            <Stack>
              <Button variant="dark"> Check-Out</Button>
            </Stack>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
