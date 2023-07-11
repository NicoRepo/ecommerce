import { data } from "../../../mock/vinyls";
import { ProductCard } from "../ProductCard";

export const ProductsDisplay = () => {
  return (
    <div className="d-flex align-content-start flex-wrap gap-3">
      {data.map((v, i) => (
        <ProductCard key={v.id} {...v} />
      ))}
    </div>
  );
};
