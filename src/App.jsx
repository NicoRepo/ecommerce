import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { NotFound } from "./components/NotFound/NotFound";
import { CheckOut } from "./components/Checkout/CheckOut";
import { Brief } from "./components/Checkout/Brief";
import { limit } from "firebase/firestore";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ItemListContainer asLanding={true} plimit={limit(4)}/>}></Route>
          <Route
            path="category/:categoryId"
            element={<ItemListContainer />}
          ></Route>
          <Route path="item/:id" element={<ItemDetailContainer />}></Route>
          <Route path="cart" element={<CheckOut />}></Route>
          <Route path="order/:orderId" element={<Brief/>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
