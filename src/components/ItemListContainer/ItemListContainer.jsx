import React from "react";

const ItemListContainer = (
  { greeting = "Bienvenido Default" } = { greeting: "Bienvenido Default" }
) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="display-4 text-white fw-bolder">{greeting}</h1>
      <p className="lead fw-normal text-white-50 mb-0">Proximamente...</p>
    </div>
  );
};

export default ItemListContainer;
