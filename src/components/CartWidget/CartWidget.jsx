import { useState } from "react";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../../Context";

const CartWidget = () => {
  const {
    state: { cart },
  } = useContext(Context);

  let itemsInCart =  Object.values(cart).reduce((a,v) => a+v.qty, 0);
  
  return (
    <Button variant="outline-dark">
      <i className="bi-cart-fill me-1"></i> Carro
      <span className="badge bg-dark text-white ms-1 rounded-pill">
        {itemsInCart}
      </span>
    </Button>
  );
};

export default CartWidget;
