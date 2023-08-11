import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Carousel,  Button} from 'react-bootstrap';

export const Landing = ({ products = [] }) => {
  const navigate = useNavigate();
  return (
    <div className="mx-2 mb-3 ">
    <Carousel className="mx-auto mb-3" style={{ width: "900px" }}>
      {products.map((v, i) => {
        return (
          <Carousel.Item key={`carousel-${v.id}`}
            className="rounded"
            onClick={() => navigate(`item/${v.id}`)}
            style={{
              cursor: "pointer",
              width: "100%",
              height: "300px",
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
      <Button variant="light" onClick={() => navigate("category/all")}>
        Ver más Productos <i className="bi bi-arrow-right"></i>
      </Button>
    </div>
  </div>
  )
}
