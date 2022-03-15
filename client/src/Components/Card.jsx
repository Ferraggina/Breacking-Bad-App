import React from "react";

import { NavLink } from "react-router-dom";
import "./Card.css";

export default function Card({ name, image, nickname, id }) {
  return (
    <div className="container">
      <NavLink to={`/characters/${id}`}>
        <img className="img" src={image} alt="" width="200px" height="250px" />
        <div className="cardFont">
          <h3>{name}</h3>
          <h5>{nickname}</h5>
        </div>
      </NavLink>
    </div>
  );
}
