import { Stack, Modal, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { Context } from "../../CartContext";
import { RemoveItemCount } from "../ItemDetailContainer/ItemCount";

export const RemoveQtyModal = ({ _id, name, qty, setShow, show }) => {
  const [rQty, setRQty] = useState(1);
  const { dispatch } = useContext(Context);
  const handleQty = (amount) => {
    //? Allows to remove a minimun (1) and max currently added (avoid having negative amount)
    if (rQty + amount >= 1 && rQty + amount <= qty) {
      setRQty(rQty + amount);
    }
  };

  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Eliminar Producto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical">
          <p>
            ¿Estás seguro que deseas eliminar <b>{name}</b> del carrito?
          </p>
          <Stack>
            <RemoveItemCount
              qty={rQty}
              handleQty={handleQty}
              className="mx-auto"
            />
          </Stack>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancelar
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            //? Remove from internal cart
            dispatch({
              type: "REMOVE_FROM_CART",
              payload: {
                _id,
                rQty,
              },
            });
            //? Restore Remove Qty to 1
            setRQty(1);
            setShow(false);
          }}
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
