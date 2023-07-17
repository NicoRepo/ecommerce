import { useEffect, useState } from "react";
import { productFilter } from "../../helpers";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { Loading } from "../Loading/Loading";

export const ItemListContainer = () => {
  const [products, setProducts] = useState(null);
  const { categoryId } = useParams();

  //? If categoryId value is undefined || 'all' filterCallback will return all products
  const filterCallback = ({ product }) => {
    if (categoryId === "all") return true;
    else return categoryId ? product.category === categoryId : true;
  };

  useEffect(() => {
    //? Clean Up items list, show loading component while promise is being resolved
    setProducts(null);
    //? Start promise, update when filtered producs are returned
    productFilter({ filterCallback }).then((filteredProducts) => {
      setProducts(filteredProducts);
    });
  }, [categoryId]);

  return products ? (
    <div className="d-flex flex-wrap gap-3">
      {products.length ? (
        products.map((v, i) => <ItemList key={v.id} {...v} />)
      ) : (
        <div className="text-center">
          <p className="lead text-white fs-1 fw-bold mb-5">No se encontraron productos :(</p>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
};
