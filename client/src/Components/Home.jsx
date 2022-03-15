import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getCharacters,
  filterCharacterByStatus,
  filterCreated,
  orderByName,
} from "../Redux/Actions/index";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const [orden, setOrden] = useState("");
  const allCharacters = useSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharactersPerPage] = useState(6);
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = allCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);
  function handleClick(e) {
    e.preventDefault();
    dispatch(getCharacters());
  }
  function handleFilterStatus(e) {
    dispatch(filterCharacterByStatus(e.target.value));
  }
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  return (
    <div>
      <div className="navBar">
        <Link to="/">
          <img
            src="http://camp.ucss.edu.pe/linternamagica/files/2016/08/Breaking-bad.png"
            alt="logito"
          />
        </Link>
        <button
          className="btnI"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Recargar Personajes
        </button>
        <Link to="/character">
          <button className="btnI">Crear Personaje</button>
        </Link>
        <div className="search">
          <SearchBar />
        </div>
      </div>
      <div>
        <div className="custom-select">
          <select className="select-css" onChange={(e) => handleSort(e)}>
            <option className="selec_Arrow" value="asc">
              Ascendente
            </option>
            <option className="selec_Arrow" value="desc">
              Descendente
            </option>
          </select>
          <select
            className="select-css"
            onChange={(e) => handleFilterStatus(e)}
          >
            <option className="selec_Arrow" value="All">
              Todos
            </option>
            <option className="selec_Arrow" value="Alive">
              Vivo
            </option>
            <option className="selec_Arrow" value="Deceased">
              Muerto
            </option>
            <option className="selec_Arrow" value="Unknown">
              Desconocido
            </option>
            <option className="selec_Arrow" value="Presumed dead">
              Probablemente Muerto
            </option>
          </select>
          <select
            className="select-css"
            onChange={(e) => handleFilterCreated(e)}
          >
            <option className="selec_Arrow" value="All">
              Todos
            </option>
            <option className="selec_Arrow" value="Created">
              Creados
            </option>
            <option className="selec_Arrow" value="api">
              Existente
            </option>
          </select>
        </div>
        <Paginado
          charactersPerPage={charactersPerPage}
          allCharacters={allCharacters.length}
          paginado={paginado}
        />
        <div className="cards">
          {currentCharacters?.map((character) => {
            return (
              <>
                <Card
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  nickname={character.nickname}
                  image={character.img ? character.img : character.image}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
