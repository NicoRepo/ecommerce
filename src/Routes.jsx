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
        path: "vinilos/:id",
        loader: async ({ params: { id } }) => {
          return data.find((p) => p.id === id);
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
