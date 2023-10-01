import React from "react";
import { NavLink } from "react-router-dom";
import "./error-effect.scss"

export const NotFound = ({code = 404, message = "Producto/Página no encontrada"} = {code: 404, message: "Producto/Página no encontrada"}) => {
  return (
    <div className="text-center">
      <div className="error mx-auto" data-text={code}>
        {code}
      </div>
      <p className="lead text-white fw-bold mb-5">{message}</p>
      <NavLink className="text-white" to="/">&larr; Volver al Inicio</NavLink>
    </div>
  );
};
