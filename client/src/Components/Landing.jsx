import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landingDiv">
      <div className="landingDivHijo">
        <Link to="/home">
          <button className="landingButton">Ingresar</button>
        </Link>
      </div>
    </div>
  );
}
