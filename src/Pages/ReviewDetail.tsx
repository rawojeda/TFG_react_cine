import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { get } from "../Utils/Api_get";
import { filmData, Review } from "../Utils/interfaces";
import { getReview } from "../Utils/BD_request";
import { FaSadCry, FaSadTear } from "react-icons/fa";
import "./CSS/ReviewDetail.css";

interface FilmId {
  filmId: string;
}
export function ReviewDetail() {
  const filmId: FilmId = useParams();

  const [film, setFilm] = useState<filmData>();
  const [review, setReview] = useState<Review>();
  const [mensaje, setMensaje] = useState<string>("");

  const URL_GETREVIEW = "http://localhost/bd-back/getReview.php";

  const getreview = async () => {
    const data = { filmId: +filmId.filmId };
    const resp = await getReview(URL_GETREVIEW, data);
    setReview(resp.Review);
    setMensaje(resp.mensaje);
  };

  useEffect(() => {
    get(
      "https://api.themoviedb.org/3/movie/" + filmId.filmId + "?language=es-ES"
    ).then((data) => {
      setFilm(data);
    });
    getreview();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return review !== undefined ? (
    <div className="Review">
      <div className="Review-Presentation">
        <div>
          <h1 className="Presentation-text-title-concrete">{review.Title}</h1>
          <h2 className="Presentation-text-Date">{review.Date}</h2>
          <p className="Presentation-text-Resumen">{review.Resumen}</p>
          <h3 className="Text-content" >{review.Review}</h3>
        </div>
        <div className="Presentation-image">
          <img
            src={"https://image.tmdb.org/t/p/w400" + film?.poster_path}
            alt={film?.original_title}
          ></img>
        </div>
      </div>
      
    </div>
  ) : (
    <>
      <div className="filmdetail_box">
        <FaSadTear className="emote-visible" />
        <h3> {mensaje} </h3> <FaSadCry className="emote-visible" />
      </div>
    </>
  );
}
