import { useEffect, useState } from "react";
import { productFilter } from "../../App";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { Loading } from "../Loading/Loading";

export const ItemListContainer = () => {
  const [products, setProducts] = useState(null);
  const { categoryId } = useParams();

  //? If categoryId value is undefined filterCallback returns all products
  const filterCallback = ({ product }) =>
    categoryId ? product.category === categoryId : true;

  useEffect(() => {
    productFilter({ filterCallback }).then((filteredProducts) => {
      setProducts(filteredProducts);
      
    });
  }, [categoryId]);

  return products ? (
    <div className="d-flex align-content-start flex-wrap gap-3">
      {products.map((v, i) => (
        <ItemList key={v.id} {...v} />
      ))}
    </div>
  ) : (
    <Loading/>
  );
};
