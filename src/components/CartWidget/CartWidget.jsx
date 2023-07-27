import { ExtendedCart } from "../NavBar/ExtendedCart";
const CartWidget = ({showFullCart, handleFullCartState, cart}) => {

  return (
    <ExtendedCart
      show={showFullCart}
      handleState={handleFullCartState}
      cart={cart}
    />
  );
};

export default CartWidget;
