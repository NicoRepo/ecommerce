import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Tab, Tabs, ListGroup, Badge } from "react-bootstrap";
import { productFind } from "../../helpers";
import { formatPrice } from "../../helpers";
import { Loading } from "../Loading/Loading";
import { AddItemCount } from "./ItemCount";

//? TODO: Split Component
export const ItemDetailContainer = () => {
  const { dispatch } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  const handleQty = (amount) => setQty(qty + amount > 1 ? qty + amount : 1);

  const addToCart = () => dispatch({
    type: "ADD_TO_CART",
    payload: {
      product,
      qty
    },
  });

  useEffect(() => {
    productFind({ id }).then((response) => {
      if (response) {
        setProduct(response);
      } else {
        //? If product was not found go to default 404
        navigate("/not-found");
      }
    });
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
                  <div className="d-flex flex-row flex-wrap justify-content-end align-items-center gap-3">
                    <Badge
                      className="text-dark border border-success"
                      bg="light" style={{padding: "12px"}}
                    >
                      $ {formatPrice(product.price * qty)}
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
