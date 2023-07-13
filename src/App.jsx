import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { data } from "./vinyls";

export const productFilter = async ({ filterCallback }) => {
  return await new Promise((resolve, reject) => {
    resolve(data.filter(p => filterCallback({product: p})));
  })
} 

export const productFind = async ({ id , ...props }) => {
  return await new Promise((resolve, reject) => {
    resolve(data.find((p) => p.id === id));
  })
}
  

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<ItemListContainer />}
          ></Route>
          <Route path="category/:categoryId" element={<ItemListContainer />}></Route>
          <Route path="item/:id" element={<ItemDetailContainer />}></Route>
          <Route path="nosotros" element={<>SOON</>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
