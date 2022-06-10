import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "../Utils/Api_get";
import { filmData, Review } from "../Utils/interfaces";
import "./CSS/ReviewCard.css";
export function ReviewCard(props: { review: Review }) {
  const [film, setFilm] = useState<filmData>();

  useEffect(() => {
    get("https://api.themoviedb.org/3/movie/" + props.review.FilmId).then(
      (data) => {
        setFilm(data);
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <div className="Review">
      <div className="Review-Presentation">
        <div>
          <Link to={"/Review/"+ props.review.FilmId} className="Presentation-text-title">{props.review.Title}</Link>
          <h2 className="Presentation-text-Date">{props.review.Date}</h2>
          <p className="Presentation-text-Resumen">{props.review.Resumen}</p>
        </div>
        <Link className="Presentation-image" to={"/Pelicula/"+ props.review.FilmId}>
          <img
             src= {"https://image.tmdb.org/t/p/w400" + film?.poster_path} alt={film?.original_title}
          ></img>
        </Link>
      </div>
    </div>
  );
}
