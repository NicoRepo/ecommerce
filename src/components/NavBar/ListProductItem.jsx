import { useState } from "react";
import { Badge, Image } from "react-bootstrap";
import { formatPrice } from "../../helpers";
import { RemoveQtyModal } from "./RemoveQtyModal";
import TextOverflow from "react-text-overflow";

export const ListProductItem = ({
  id,
  img,
  name,
  qty,
  price,
  readOnly = false,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div
      key={id}
      className="d-flex justify-content-start align-items-center border border-dark pe-2 rounded my-1"
    >
      <Image src={img} rounded style={{ width: "40px" }}></Image>
      <div className="ms-1 me-auto">
        <div className="fw-bold">
          <TextOverflow text={name} />
        </div>
      </div>
      <div className="d-flex gap-2">
        <Badge bg="dark">x{qty}</Badge>
        <Badge bg="warning">${formatPrice(qty * price)}</Badge>
        {!readOnly && (
          <>
            <Badge
              bg="danger"
              className="trash-hover"
              onClick={() => setShow(true)}
            >
              <i className="bi bi-trash"></i>
            </Badge>
          </>
        )}
      </div>
      <RemoveQtyModal
        name={name}
        setShow={setShow}
        show={show}
        qty={qty}
        id={id}
      />
    </div>
  );
};
