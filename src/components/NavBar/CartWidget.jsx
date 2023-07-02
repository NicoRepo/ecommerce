import {useState} from "react";
import { Button } from "react-bootstrap";

const CartWidget = () => {
  const [cartCount, setCartCount] = useState(0);
  return (
    <Button variant="outline-dark">
      <i class="bi-cart-fill me-1"></i> Carro
      <span class="badge bg-dark text-white ms-1 rounded-pill">
        {cartCount}
      </span>
    </Button>
  );
};

export default CartWidget;
