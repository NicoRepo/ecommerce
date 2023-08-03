import { useState } from "react";
import { Card, Badge, Stack } from "react-bootstrap";
import TextOverflow from "react-text-overflow";
import { formatPrice } from "../../helpers";
import { RemoveQtyModal } from "../NavBar/RemoveQtyModal";

export const ProductCard = ({ id, img, name, price, artist, qty }) => {
  const [show, setShow] = useState(false);
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
          <div className="ms-auto d-flex flex-row gap-2 align-items-center">
            <Badge bg="dark" className="p-2">
              x{formatPrice(qty)}
            </Badge>
            <Badge className="text-dark p-2 border border-success" bg="light">
              $ {formatPrice(price)}
            </Badge>
            <Badge
              bg="danger"
              className="trash-hover p-2"
              onClick={() => setShow(true)}
            >
              <i className="bi bi-trash"></i>
            </Badge>
          </div>
        </div>
      </Card.Body>
      <RemoveQtyModal
        name={name}
        setShow={setShow}
        show={show}
        qty={qty}
        id={id}
      />
    </Card>
  );
};
