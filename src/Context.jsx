import { useReducer, createContext } from "react";
import { toast } from "react-toastify";

const initialState = {
  cart: {},
};

const Context = createContext({});

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

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = state.cart[action.payload.product.id];
      const qty = action.payload.qty;
      notifyAddProduct(action.payload.product.name);
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload.product.id]: item
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
    case "REMOVE_FROM_CART":
      const newCart = { ...state.cart };
      const currProd = newCart[action.payload.id];
      if (currProd?.qty > 1 && currProd) {
        currProd.qty = currProd.qty - action.payload.rQty;
        if (currProd.qty) {
          newCart[action.payload.id] = currProd;
        } else {
          delete newCart[action.payload.id];
        }
      } else {
        delete newCart[action.payload.id];
      }
      notifyRemoveProduct(action.payload.rQty)
      return { ...state, cart: newCart };
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

export { Context, Provider };
