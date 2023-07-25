import React, { useState, useContext } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TextOverflow from "react-text-overflow";
import { formatPrice } from "../../helpers";
import { Context } from "../../Context";
import "./index.css";

export const ItemList = ({ product }) => {
  const { name, img, id, description, price, artist } = product;
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);

  const navigateItemPage = () => {
    navigate(`/item/${id}`);
  };

  useState(() => {}, []);

  return (
    <Card
      className="highligth-effect mx-auto item-focus"
      style={{ width: "18rem" }}
    >
      <Card.Img variant="top" src={img} onClick={navigateItemPage} />
      <Card.Body>
        <div className="d-flex flex-column" style={{ height: "8rem" }}>
          <Card.Title className="mb-1">
            <TextOverflow text={name} />
          </Card.Title>
          <Card.Subtitle className="mb-2 text-secondary">
            {artist}
          </Card.Subtitle>
          <Card.Text className="block-with-text">
            <TextOverflow text={description} />
          </Card.Text>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <Badge className="text-dark p-2 border border-success" bg="light">
              $ {formatPrice(price)}
            </Badge>
            <Button
              size="sm"
              variant="outline-dark"
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: {
                    product,
                    qty: 1,
                  },
                })
              }
            >
              <i className="bi bi-cart-plus me-1"></i>Añadir al Carrito
            </Button>
          </div>
        </div>
      </Card.Body>
      <div className="border-effect"></div>
    </Card>
  );
};
