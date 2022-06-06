import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { get } from "../Utils/Api_get";
import "./CSS/FilmData.css";
import { filmData, User } from "../Utils/interfaces";
import images from "../Images/images";
import { foto_puntaje } from "../Utils/Puntaje";

interface FilmId {
  peliculaId: string;
}

export function FilmData(props:{user: User}) {
  const filmId: FilmId = useParams();
  const [film, setFilm] = useState<filmData>();
  useEffect(() => {
    get("https://api.themoviedb.org/3/movie/" + filmId.peliculaId).then(
      (data) => {
        setFilm(data);
      }
    );
  }, [filmId]);

  const imageUrl = film
    ? film.poster_path
      ? "https://image.tmdb.org/t/p/w400" + film.poster_path
      : images.placeholder
    : "";
  return (
    <>
      <p className="title">
        <strong> {film ? film.title : "No data"}</strong>
      </p>
      <div className="filmdetail_box">
        <img
          src={imageUrl}
          className="filmImage"
          alt={film ? film.title : "Sin foto"}
        ></img>
        <div className="filmData">
          <p>
            <strong>Lanzamiento: </strong>{" "}
            {film ? film.release_date : "sin fecha de lanzamiento"}
          </p>

          {film ? (
            <p>
              <strong>Géneros: </strong>
              {film.genres.map((genre) => genre.name).join(", ")}
            </p>
          ) : (
            "Género/s desconocidos"
          )}
          <p>
            <strong>Descripción: </strong>
            {film ? film.overview : "No hay descripción."}
          </p>
          <div className="puntuacion">
            <strong>Puntuación en TMDB: {film ? film.vote_average : "Puntuación no disponible"}</strong>
            {film ? (
              <img
                src={foto_puntaje(film.vote_average)}
                className="image_votes"
                alt={film.original_title}
              ></img>
            ) : (
              "Puntaje desconocido"
            )}
          </div>
        </div>
      </div>
    </>
  );
}
