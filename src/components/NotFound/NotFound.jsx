import React from "react";
import { NavLink } from "react-router-dom";
import "./error-effect.scss"

export const NotFound = () => {
  return (
    <div className="text-center">
      <div className="error mx-auto" data-text="404">
        404
      </div>
      <p className="lead text-white mb-5">Página no encontrada</p>
      <NavLink className="text-white"  to="/">&larr; Volver al Inicio</NavLink>
    </div>
  );
};
