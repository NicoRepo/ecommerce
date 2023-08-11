import { InputGroup, Form, Button, ButtonGroup } from "react-bootstrap";

export const RemoveItemCount = ({
  qty,
  handleQty,
  className,
  inputSize = "150px",
}) => {
  return (
    <InputGroup className={className} style={{ maxWidth: "50%" }}>
      <Button variant="outline-danger" onClick={() => handleQty(-1)}>
        <i className="bi bi-dash-lg"></i>
      </Button>
      <Form.Control
        type="number"
        readOnly
        aria-label="Cantidad"
        className="text-center"
        value={qty}
        style={{ maxWidth: inputSize }}
      />
      <Button variant="outline-success" onClick={() => handleQty(1)}>
        <i className="bi bi-plus-lg"></i>
      </Button>
    </InputGroup>
  );
};

export const AddItemCount = ({
  qty,
  handleQty,
  dispatch
}) => {
  return (
    <ButtonGroup>
      <Button variant="danger" onClick={() => handleQty(-1)}>
        <i className="bi bi-dash-lg"></i>
      </Button>
      <Button
        variant="outline-dark"
        onClick={dispatch}
      >
        <i className="bi bi-cart-plus me-1"></i>Añadir al Carrito <b>({qty})</b>
      </Button>
      <Button variant="success" onClick={() => handleQty(1)}>
        <i className="bi bi-plus-lg"></i>
      </Button>
    </ButtonGroup>
  );
};
