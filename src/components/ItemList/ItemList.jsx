import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import TextOverflow from "react-text-overflow";
import { formatPrice } from "../../helpers";
import "./index.css";

export const ItemList = ({ name, img, id, description, price, artist }) => {
  const navigate = useNavigate();

  const navigateItemPage = () => {
    navigate(`/item/${id}`);
  };

  useState(() => {}, []);

  return (
    <Card className="highligth-effect" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} />
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
          <div className="d-flex flex-row justify-content-between mt-auto">
            <Button disabled variant="outline-dark">${formatPrice(price)}</Button>
            <Button variant="outline-dark" onClick={navigateItemPage}>
              Ver
            </Button>
          </div>
        </div>
      </Card.Body>
      <div className="border-effect"></div>
    </Card>
  );
};
