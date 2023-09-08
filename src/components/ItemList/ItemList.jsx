import React, { useState, useContext } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TextOverflow from "react-text-overflow";
import { formatPrice } from "../../helpers";
import { Context } from "../../CartContext";
import "./index.css";

export const ItemList = ({ product }) => {
  const { name, img, _id, description, price, artist, stock = null } = product;
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);

  const navigateItemPage = () => {
    navigate(`/item/${_id}`);
  };

  useState(() => {}, []);

  return (
    <Card
      className="highligth-effect mx-auto item-focus producto"
      onClick={navigateItemPage}
      style={{ width: "18rem" }}
    >
      <Card.Img
        style={{ width: "286px" }}
        variant="top"
        src={img}
   
      />
      <div className="mensaje">Ver</div>
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
            <Badge className="text-dark p-2 border border-warning" bg="light">
              Stock: {stock}
            </Badge>
            <Button
              size="sm"
              variant="outline-dark"
              onClick={(e) => {
                e.stopPropagation();
                dispatch({
                  type: "ADD_TO_CART",
                  payload: {
                    product,
                    qty: 1,
                  },
                });
              }}
            >
              <i className="bi bi-cart-plus me-1"></i>Añadir
            </Button>
          </div>
        </div>
      </Card.Body>
      <div className="border-effect"></div>
    </Card>
  );
};
