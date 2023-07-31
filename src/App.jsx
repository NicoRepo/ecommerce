import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { NotFound } from "./components/NotFound/NotFound";
import { CheckOut } from "./components/CheckOut/CheckOut";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ItemListContainer asLanding={true}/>}></Route>
          <Route
            path="category/:categoryId"
            element={<ItemListContainer />}
          ></Route>
          <Route path="item/:id" element={<ItemDetailContainer />}></Route>
          <Route path="check-out" element={<CheckOut />}></Route>
          <Route path="nosotros" element={<>SOON</>}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
