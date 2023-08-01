import { useEffect, useState } from "react";
import { productFilter } from "../../helpers";
import { useParams, useNavigate } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { Loading } from "../Loading/Loading";
import { Stack } from "react-bootstrap";
import { Landing } from "./Landing";

export const ItemListContainer = ({ asLanding = false }) => {
  const [products, setProducts] = useState(null);
  const { categoryId = "all" } = useParams();

  const q = categoryId && categoryId !== "all" ? ["category", "==", categoryId] : null;

  useEffect(() => {
    //? Clean Up items list, show loading component while promise is being resolved
    setProducts(null);
    //? Start promise, update when filtered producs are returned
    productFilter({ filter: q, sort: "name" }).then((filteredProducts) => {
      setProducts(filteredProducts);
    });
  }, [categoryId]);

  return products ? (
    <Stack direction="vertical">
      {asLanding ? (
        <Landing products={products}/>
      ) : (
        <div className="d-flex flex-wrap gap-3">
          {products.length ? (
            products.map((v, i) => <ItemList key={v.id} product={v} />)
          ) : (
            <div className="text-center">
              <p className="lead text-white fs-1 fw-bold mb-5">
                No se encontraron productos :(
              </p>
            </div>
          )}
        </div>
      )}
    </Stack>
  ) : (
    <Loading />
  );
};
