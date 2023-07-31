import { useEffect, useState } from "react";
import { productFilter } from "../../helpers";
import { useParams, useNavigate } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { Loading } from "../Loading/Loading";
import { Button, Carousel, Stack } from "react-bootstrap";

export const ItemListContainer = ({ asLanding = false }) => {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();
  const { categoryId = "all" } = useParams();

  const q =
    categoryId && categoryId !== "all" ? ["category", "==", categoryId] : null;

  useEffect(() => {
    //? Clean Up items list, show loading component while promise is being resolved
    setProducts(null);
    //? Start promise, update when filtered producs are returned
    productFilter({ filter: q }).then((filteredProducts) => {
      setProducts(filteredProducts);
    });
  }, [categoryId]);

  return products ? (
    <Stack direction="vertical">
      {asLanding ? (
        <div className="mx-2 mb-3">
          <Carousel className="mb-3">
            {products.map((v, i) => {
              return (
                <Carousel.Item
                  className="rounded"
                  onClick={() => navigate(`item/${v.id}`)}
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    height: "500px",
                    backgroundImage: `url(${v.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <Carousel.Caption
                    className="rounded"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                  >
                    <h3 className="fw-bold">{v.name}</h3>
                    <h4 className="fst-italic">{v.artist}</h4>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
          <hr className="text-white" />
          <p className="fw-bold text-white" style={{ textAlign: "justify" }}>
            Somos Vinyl Store, una tienda online con más de 5 años de
            experiencia en importación y venta de vinilos. Desde Pop-Punk hasta
            Post-Hardcore, tratamos con los más diversos géneros y época,
            enfocándonos en la calidad de la música que tú quieres escuchar.
          </p>
          <div className="d-flex justify-content-center">
            <Button variant="light" onClick={() => navigate("category/all")}>Ver Productos</Button>
          </div>
        </div>
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
