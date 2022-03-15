import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { getNameCharacters } from "../Redux/Actions/index";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameCharacters(name));
  }

  return (
    <div>
      <input
        className="buscador"
        id="in"
        type="text"
        placeholder="Escribir..."
        // value={name}
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className="buscador"
        id="bt"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Buscar
      </button>
    </div>
  );
}
