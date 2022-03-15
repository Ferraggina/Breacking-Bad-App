import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postCharacter, getOccupations } from "../Redux/Actions";
import "./CharacterCreate.css";

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Se requiere un nombre";
  } else if (!input.nickname) {
    errors.nickname = "Se requiere un nickname";
  }

  return errors;
}

export default function CharacterCreate() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const occupations = useSelector((state) => state.occupations);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    nickname: "",
    birthday: "",
    status: "",
    occupation: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        status: e.target.value,
      });
    }
  }

  function handleSelect(e) {
    setInput({
      ...input,
      occupation: [...input.occupation, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postCharacter(input));
    alert("Personaje creado con exito");
    setInput({
      name: "",
      nickname: "",
      birthday: "",
      status: "",
      occupation: [],
    });
    history.push("/home");
  }

  function handleDelete(el) {
    setInput({
      ...input,
      occupation: input.occupation.filter((occ) => occ !== el),
    });
  }

  useEffect(() => {
    dispatch(getOccupations());
  }, [dispatch]);

  return (
    <div className="form">
      <h1 className="title">Crea tu personaje!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="formFonts">Nombre: </label>
          <input
            className="input-container ic1"
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label className="formFonts">Nickname: </label>
          <input
            className="input-container ic1"
            type="text"
            value={input.nickname}
            name="nickname"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label className="formFonts">Cumpleaños: </label>
          <input
            className="input-container ic1"
            type="text"
            value={input.birthday}
            name="birthday"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label className="formFonts">Imagen: </label>
          <input
            className="input-container ic1"
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label className="formFonts">Estado: </label>
          <label className="checkFonts">
            <input
              type="checkbox"
              value="Alive"
              name="Alive"
              onChange={(e) => handleCheck(e)}
            />
            Vivo
          </label>
          <label className="checkFonts">
            <input
              type="checkbox"
              value="Deceased"
              name="Deceased"
              onChange={(e) => handleCheck(e)}
            />
            Muerto
          </label>
          <label className="checkFonts">
            <input
              type="checkbox"
              value="Unknown"
              name="Unknown"
              onChange={(e) => handleCheck(e)}
            />
            Desconocido
          </label>
          <label className="checkFonts">
            <input
              type="checkbox"
              value="Presumed dead"
              name="Presumed dead"
              onChange={(e) => handleCheck(e)}
            />
            Probablemente muerto
          </label>
        </div>
        <select className="select-css" onChange={(e) => handleSelect(e)}>
          {occupations.map((occ) => {
            return <option value={occ.name}>{occ.name}</option>;
          })}
        </select>
        <ul>
          <li>{input.occupation.map((el) => el + " ,")}</li>
        </ul>
        {input.occupation.map((el) => (
          <div className="deleteContainer">
            <p className="deleteFont">{el}</p>
            <button className="deleteButton" onClick={(e) => handleDelete(el)}>
              x
            </button>
          </div>
        ))}
        <button className="submit" type="submit">
          Crear
        </button>
        <Link to="/home">
          <button className="submit">volver</button>
        </Link>
      </form>
    </div>
  );
}
