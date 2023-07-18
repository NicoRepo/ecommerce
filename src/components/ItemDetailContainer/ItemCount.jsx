import { InputGroup, Form, Button } from "react-bootstrap";

export const ItemCount = ({ qty, handleQty }) => {
  return (
    <InputGroup style={{maxWidth: "20%"}}>
      <Button variant="outline-danger" onClick={() => handleQty(-1)}><i className="bi bi-dash-lg"></i></Button>
      <Form.Control
        type="number"
        disabled
        aria-label="Cantidad"
        value={qty}
      />
      <Button variant="outline-success" onClick={() => handleQty(1)}><i className="bi bi-plus-lg"></i></Button>
    </InputGroup>
  );
};
