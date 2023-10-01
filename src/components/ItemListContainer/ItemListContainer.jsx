import { useEffect, useState } from "react";
import { productFilter } from "../../API/API";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { Loading } from "../Loading/Loading";
import { Stack } from "react-bootstrap";
import { Landing } from "./Landing";
import { getProducts } from "../../API/API_V2";
import { NotFound } from "../NotFound/NotFound";

export const ItemListContainer = ({ asLanding = false }) => {
  const [products, setProducts] = useState(null);
  const { categoryId = null } = useParams();

  useEffect(() => {
    //? Clean Up items list, show loading component while promise is being resolved
    setProducts(null);
    //? Start promise, update when filtered producs are returned

    getProducts({ category: categoryId }).then((responseProds) => {
      setProducts(responseProds);
    });
  }, [categoryId]);

  return products ? (
    <Stack direction="vertical">
      {products.length ? (
        !asLanding ? (
          <div className="d-flex flex-wrap gap-3">
            {products.map((v, i) => (
              <ItemList key={v._id} product={v} />
            ))}
          </div>
        ) : (
          <Landing products={products} />
        )
      ) : (
        <NotFound code={404} message="No se encontraron productos :(" />
      )}
    </Stack>
  ) : (
    <Loading />
  );
};
