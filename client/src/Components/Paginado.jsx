import React from "react";
import "./Paginado.css";

export default function Paginado({
  charactersPerPage,
  allCharacters,
  paginado,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allCharacters / charactersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <a href="#" onClick={() => paginado(number)}>
                {number}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
