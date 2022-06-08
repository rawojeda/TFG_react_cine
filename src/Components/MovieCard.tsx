import React from "react";
import "../Images/images";
import { Link } from "react-router-dom";
import { FilmDescription } from "../Utils/interfaces";
import "./CSS/MovieCard.css";
import images from "../Images/images";


export function MovieCard(props: { film: FilmDescription ;}) {
  const imageUrl = props.film.poster_path 
  ? "https://image.tmdb.org/t/p/w400" + props.film.poster_path 
  : images.placeholder;
  return (
    <li className="movieCard">
      <Link to={"/Pelicula/" + props.film.id}>
      <img className="movieImage" src={imageUrl} width={230} height={345} alt={props.film.title}/>
      <div className="titles">{props.film.title}</div>
      </Link>
    </li>
  );
}
