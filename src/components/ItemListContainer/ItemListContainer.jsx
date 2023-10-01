import { useEffect, useState } from "react";
import { productFilter } from "../../API/API";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { Loading } from "../Loading/Loading";
import { Stack } from "react-bootstrap";
import { Landing } from "./Landing";
import { getProducts } from "../../API/API_V2";

export const ItemListContainer = ({ asLanding = false }) => {
  const [products, setProducts] = useState(null);
  const { categoryId = null } = useParams();

  useEffect(() => {
    //? Clean Up items list, show loading component while promise is being resolved
    setProducts(null);
    //? Start promise, update when filtered producs are returned

    getProducts({category: categoryId}).then(responseProds => {
      setProducts(responseProds)
    })

  }, [categoryId]);

  return products ? (
    <Stack direction="vertical">
      {asLanding ? (
        <Landing products={products}/>
      ) : (
        <div className="d-flex flex-wrap gap-3">
          {products.length ? (
            products.map((v, i) => <ItemList key={v._id} product={v} />)
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
