import { Stack, Modal, Button } from "react-bootstrap";
import { useState, useContext } from "react";
import { Context } from "../../Context";
import { RemoveItemCount } from "../ItemDetailContainer/ItemCount";

export const RemoveQtyModal = ({ id, name, qty, setShow, show }) => {
    const [ rQty, setRQty ] = useState(1);
    const { dispatch } = useContext(Context);
    const handleQty = (amount) => {
      if(rQty + amount >= 1 && rQty + amount <= qty){
        setRQty(rQty + amount);
      }
    }
  
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
              <RemoveItemCount qty={rQty} handleQty={handleQty} className="mx-auto" />
            </Stack>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => {
             dispatch({
              type: "REMOVE_FROM_CART",
              payload: {
                id,
                rQty
              },
            });
            setRQty(1);
            setShow(false)
          }}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };