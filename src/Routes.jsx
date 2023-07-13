import { ProductsDisplay } from "./components/Products/ProductsDisplay";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { Layout } from "./components/Layout/Layout";
import { ProductPage } from "./components/Products/ProductPage";
import { data } from "./mock/vinyls";
import { element } from "prop-types";

export const routes = [
  {
    path: "/",
    //? This could be a Protected Route
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ItemListContainer greeting="Bienvenido" />,
      },
      {
        path: "vinilos",
        element: <ProductsDisplay />,
      },
      {
        id: "XD",
        path: "vinilos/:id",
        loader: async ({params: {id}, ...props}) => {
          console.log(props.request)
          return data.find((p) => p.id === "fa4bca6d-4589-4409-898e-67559b5efd76");
        },
        element: <ProductPage />,
      },
      {
        path: "nosotros",
        element: <>Soon</>
      }
    ],
  },
];
