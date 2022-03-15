import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getDetail } from "../Redux/Actions";
import "./Detail.css";

export default function Detail(props) {
  console.log(props);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);
  console.log(id);

  const myCharacter = useSelector((state) => state.detail);

  return (
    <div className="contenedor" color="white">
      {myCharacter.length === 0 ? (
        <img
          src="https://64.media.tumblr.com/tumblr_m3f2re29EE1rqr258o1_500.gifv"
          alt="Loading..."
          className="loader"
        />
      ) : (
        <div className="detail">
          <h1>{myCharacter[0].name}</h1>
          <div className="imagenDetalle">
            <img
              src={
                myCharacter[0].img ? myCharacter[0].img : myCharacter[0].image
              }
              alt=""
              width="400px"
              height="550px"
            />
          </div>
          <div className="subtitle">Status:</div>
          <div className="text">{myCharacter[0].status}</div>
          <div className="subtitle">Cumpleaños:</div>
          <div className="text">{myCharacter[0].birthday}</div>
          {!myCharacter[0].createdInDb ? (
            <div>
              <div className="subtitle">Ocupaciones:</div>
              <div className="text">
                <p>{myCharacter[0].occupation}</p>
                <br />{" "}
              </div>
            </div>
          ) : (
            <div>
              <div className="subtitle">Ocupaciones:</div>
              <div className="text">
                {myCharacter[0].occupations.map((el) => el.name + " ")}
              </div>
            </div>
          )}
          {/* {recipe_id.instructions && (
              <div>
                <div className="subtitle">PASO A PASO :</div>
                <div className="text">{recipe_id.instructions}</div>
               </div>
            )} */}
          {/* <h4>
              Ocupaciones:{" "}
              {!myCharacter[0].createdInDb
                ? myCharacter[0].occupation + " "
                : myCharacter[0].occupations.map((el) => el.name + " ")}
            </h4> */}
        </div>
      )}
      <div className="botonDetalle">
        <Link to="/home">
          <button className="button">volver</button>
        </Link>
      </div>
    </div>
  );
}
