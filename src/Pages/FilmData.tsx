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
      <img src={imageUrl} className="filmImage" alt={film ? film.title : "No data"}></img>
      <div className="filmData">
        <p>
          <strong>Titulo: {film ? film.title : "No data"}</strong>
        </p>

        {film ? (
          <p>
            <strong>
              Genero:
              {film.genres.map((genre) => genre.name).join(", ")}
            </strong>
          </p>
        ) : (
          "No data"
        )}
        <strong>
          <p>Descripcion: {film ? film.overview : "No Data"}</p>
        </strong>
      </div>
    </div>
  );
}
