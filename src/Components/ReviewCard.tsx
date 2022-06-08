import { useEffect, useState } from "react";
import { get } from "../Utils/Api_get";
import { filmData, Review } from "../Utils/interfaces";
import './CSS/ReviewCard.css';
export function ReviewCard(props: { review: Review }) {
    const [film, setFilm] = useState<filmData>();
    useEffect(() => {
        get("https://api.themoviedb.org/3/movie/" + props.review.FilmId).then(
            (data) => {
              setFilm(data);
            }
          );
    }, [])
    //backdrop_path es mas ancha y poster path el clasico de cartelera
    return (
        <div className="Review">
           <img src={"https://image.tmdb.org/t/p/w400"+film?.backdrop_path}></img>
           <img src={"https://image.tmdb.org/t/p/w400"+film?.poster_path}></img>
           {props.review.FilmId}
        </div>
    );
}