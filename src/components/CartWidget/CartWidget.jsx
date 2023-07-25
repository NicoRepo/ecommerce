import { useState } from "react";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../Context";
import { ExtendedCart } from "../NavBar/ExtendedCart";

const CartWidget = () => {
  const {
    state: { cart },
  } = useContext(Context);

  let itemsInCart = Object.values(cart).reduce((a, v) => a + v.qty, 0);
  const [showFullCart, setShowFullCart] = useState(false);

  const handleFullCartState = (state) => setShowFullCart(state);

  return (
    <>
      <Button variant="outline-dark" onClick={() => handleFullCartState(true)}>
        <i className="bi-cart-fill me-1"></i> Carrito
        <span className="badge bg-dark text-white ms-1 rounded-pill">
          {itemsInCart}
        </span>
      </Button>
      <ExtendedCart show={showFullCart} handleState={handleFullCartState} cart={cart}/>
    </>
  );
};

export default CartWidget;
