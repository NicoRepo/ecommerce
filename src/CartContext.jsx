import { useReducer, createContext } from "react";
import { toast } from "react-toastify";

const initialState = {
  cart: {},
};

const Context = createContext({});

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = state.cart[action.payload.product._id];
      const qty = action.payload.qty;
      if (item && item?.qty >= item?.stock) {
        toast.error(
          "No puedes añadir más elementos de los que hay disponibles en stock",
          { position: "top-right" }
        );
        return { ...state };
      } else {
        notifyAddProduct(action.payload.product.name);
        //? If current productd id key is not present on cart add new product else, sum qty
        return {
          ...state,
          cart: {
            ...state.cart,
            [action.payload.product._id]: item
              ? {
                  ...item,
                  qty: item.qty + qty,
                }
              : {
                  ...action.payload.product,
                  qty: qty,
                },
          },
        };
      }
    case "REMOVE_FROM_CART":
      const newCart = { ...state.cart };
      const currProd = newCart[action.payload._id];
      //? If current amount is at least 1 just decrease product qty
      if (currProd?.qty > 1 && currProd) {
        currProd.qty = currProd.qty - action.payload.rQty;
        //? Case when remove was made in 2 steps and only one element remains after first removal
        if (currProd.qty) {
          newCart[action.payload._id] = currProd;
        } else {
          //? Remove
          delete newCart[action.payload._id];
        }
      } else {
        delete newCart[action.payload._id];
      }
      //* Spam
      //notifyRemoveProduct(action.payload.rQty);
      return { ...state, cart: newCart };
    case "EMPTY_CART":
      return initialState;
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

const notifyAddProduct = (name) =>
  toast.success(`${name} añadido al carrito!`, {
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const notifyRemoveProduct = (amount) =>
  toast.warning(`Se han removido ${amount} elementos del carrito!`, {
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export { Context, Provider };
