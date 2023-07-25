import { useState } from "react";
import { ListGroupItem, Badge } from "react-bootstrap";
import { formatPrice } from "../../helpers";
import { RemoveQtyModal } from "./RemoveQtyModa";

export const ListProductItem = ({ id, name, qty, price }) => {
    const [show, setShow] = useState(false);
    return (
      <ListGroupItem
        key={id}
        className="d-flex justify-content-between align-items-center"
      >
        <div className="me-auto">
          <div className="fw-bold">{name}</div>
        </div>
        <div className="d-flex gap-2">
          <Badge bg="dark">x{qty}</Badge>
          <Badge bg="warning">${formatPrice(qty * price)}</Badge>
          <Badge
            bg="danger"
            className="trash-hover"
            onClick={() => setShow(true)}
          >
            <i className="bi bi-trash"></i>
          </Badge>
        </div>
        <RemoveQtyModal name={name} setShow={setShow} show={show} qty={qty} id={id}/>
      </ListGroupItem>
    );
  };