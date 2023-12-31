import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../CartContext";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Tab, Tabs, ListGroup, Badge } from "react-bootstrap";
import { productFind } from "../../API/API";
import { getProduct } from "../../API/API_V2";
import { formatPrice } from "../../helpers";
import { Loading } from "../Loading/Loading";
import { AddItemCount } from "./ItemCount";
import { toast } from "react-toastify";

//? TODO: Split Component
export const ItemDetailContainer = () => {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  //? Add elements. Prevents current amount goung below 1 and work with negative valus
  const handleQty = (amount) => {
    if(qty < product.stock){
      setQty(qty + amount > 1 ? qty + amount : 1);
    }else{
      toast.error("No puedes añadir más elementos de los que hay disponibles en stock", {position: "top-right"});
    }
  }

  const addToCart = () => dispatch({
    type: "ADD_TO_CART",
    payload: {
      product,
      qty
    },
  });

  useEffect(() => {

    getProduct({ productId: id}).then(responseProd => {
      if(responseProd) setProduct(responseProd);
      else navigate("/not-found");
    })

  }, [id]);

  return !product ? (
    <Loading />
  ) : (
    <Card bg="light" style={{ minWidth: "335px", maxWidth: "70rem" }}>
      <Card.Body>
        <div className="d-flex justify-content-start justify-content-center gap-4 mb-5 flex-wrap">
          <div className="flex-shrink-0">
            <Card.Img
              variant="top"
              className="rounded border border-dark"
              src={product.img}
              style={{ width: "300px" }}
            />
          </div>
          <div className="flex-grow-1">
            <Tabs defaultActiveKey="product" id="uncontrolled-tab-example" fill>
              <Tab eventKey="product" title="Producto" className="pt-3 px-2">
                <div className="d-flex flex-column" style={{ height: "240px" }}>
                  <div className="mb-auto">
                    <Card.Title className="fs-3">{product.name}</Card.Title>
                    <Card.Subtitle className="fs-4 fst-italic text-secondary">
                      {product.artist}
                    </Card.Subtitle>
                  </div>
                  <div className="d-flex flex-row fl justify-content-end align-items-center gap-3">
                    <Badge
                      className="text-dark border border-success"
                      bg="light" style={{padding: "12px"}}
                    >
                      $ {formatPrice(product.price * qty)}
                    </Badge>
                    <Badge
                      className="text-dark border border-warning"
                      bg="light" style={{padding: "12px"}}
                    >
                      Stock: {product.stock}
                    </Badge>
                    <AddItemCount qty={qty} handleQty={handleQty} dispatch={addToCart}/>
                  </div>
                </div>
              </Tab>
              <Tab
                eventKey="profile"
                title="Tracklist"
                style={{ height: "255px" }}
                className="overflow-auto"
              >
                <ListGroup as="ol" numbered>
                  {product.tracklist.map((t, index) => (
                    <ListGroup.Item key={`track-${index}`} as="li">
                      {t}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab>
            </Tabs>
          </div>
        </div>
        <Card.Title>Descripción</Card.Title>
        {/* This should be rendered as MarkDown to preserve description styling from official description */}
        <Card.Text className="text-break" style={{textAlign: "justify"}}>{product.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};
