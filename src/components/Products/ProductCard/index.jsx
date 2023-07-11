import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import TextOverflow from "react-text-overflow";
import "./index.css";

export const ProductCard = ({ name, img, id, description }) => {
  const navigate = useNavigate();

  const navigateToProductPage = () => {
    navigate(`/vinilos/${id}`);
  };

  useState(() => {}, []);

  return (
    <Card className="highligth-effect" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <div className="d-flex flex-column" style={{ height: "8rem" }}>
          <Card.Title className="mb-3">
            <TextOverflow text={name} />
          </Card.Title>
          <Card.Text className="block-with-text">
            <TextOverflow text={description} />
          </Card.Text>
          <div className="d-flex flex-row-reverse mt-auto">
            <Button variant="outline-dark" onClick={navigateToProductPage}>
              Ver
            </Button>
          </div>
        </div>
      </Card.Body>
      <div className="border-effect"></div>
    </Card>
  );
};
