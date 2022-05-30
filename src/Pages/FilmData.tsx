import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { get } from "../Utils/Api_get";
import "./CSS/FilmData.css";
import { filmData } from "../Utils/interfaces";
import images from "../Images/images";

interface FilmId {
  peliculaId: string;
}
export function FilmData() {
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
    <div className="filmdetail_box">
      <img
        src={imageUrl}
        className="filmImage"
        alt={film ? film.title : "No data"}
      ></img>
      <div className="filmData">
        <p className="lanzamiento">
          <strong>Lanzamiento: </strong>{" "}
          {film ? film.release_date : "sin fecha de lanzamiento"}
        </p>
        <p>
          <strong>Título: </strong> {film ? film.title : "No data"}
        </p>

        {film ? (
          <p>
            <strong>Géneros: </strong>
            {film.genres.map((genre) => genre.name).join(", ")}
          </p>
        ) : (
          "No data"
        )}
        <p>
          <strong>Descripción: </strong>
          {film ? film.overview : "No Data"}
        </p>
      </div>
    </div>
  );
}
